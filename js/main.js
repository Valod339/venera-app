window.addEventListener("scroll", function(e){
    let header = $("header")
    let menu = $(".header_inner .header_item nav ul li a")
    if(window.scrollY > 0){
        $(header).addClass("active");
        $(menu).addClass("active");
    }else{
        $(header).removeClass("active");
        $(menu).removeClass("active");
    }
})


function burger() {
    const menuBtn = $(".btn_menu_active");
    const menuBtnClose = $(".btn_menu_close");
    const menu = $(".header_inner .header_item nav");
    menuBtn.on("click", function (e) {
        e.preventDefault()
        $(menu).addClass("active");
    })
    menuBtnClose.on("click", function (e) {
        e.preventDefault()
        $(menu).removeClass("active");
        
    })
    $(".menu li a").on("click", function(e){
        $(menu).removeClass("active");
    })
}
burger()
function skill() {
    const skill = document.querySelector(".skill")

    skill_cont = [
        {
            titel: "skill",
            precent: 93,
            color: "#FB5B40"
        },
        {
            titel: "studio",
            precent: 78,
            color: "#A957E5"
        },
        {
            titel: "experience",
            precent: 89,
            color: "#74B75C"
        }
        
    ]
    skill_cont.forEach(item => {
        skill.innerHTML += `
        <div class="skill_content">
            <div class="skill_title">
                <span style=" color: ${item["color"]}">${item["titel"]}</span>
                <span style=" color: ${item["color"]}">${item["precent"]}%</span>
            </div>
            <div class="skill_bar">
                <div class="skill_progres" style=" width: ${item["precent"]}%; background: ${item["color"]}">
                </div>
            </div>
        </div>
        `
    });
}
skill()
function tab_cat() {
    const btn = document.querySelectorAll(".portfolio_tab_list li button");
    const img = document.querySelectorAll(".portfolio_img_item");
    btn.forEach(item =>{
        console.log();
        item.addEventListener("click", function() {
            const dataName = this.getAttribute("data-tab-name") 
            if(dataName != "all"){
                hidden()
                getTabName(dataName)
            }else{
                getTabName(dataName)
            }
        })
        function hidden() {
            img.forEach(item =>{
                item.style.display = "none"
            })
        }
        
        
       function getTabName(name){
            img.forEach(item =>{
                let itemName = item.getAttribute("data-tab-img")
                if(itemName == name){
                    item.style.display = 'block'
                    item.classList.toggle("animate__fadeIn")
                }else{
                    item.style.display = 'none'
                }
                if(name == "all"){
                    item.style.display = "block"
                }
            })
        }
    })
}
tab_cat()
function scrolls() {
    const anchor = document.querySelectorAll('a[href*="#"');

for (let anc of anchor){
    anc.addEventListener("click", function (e) {
        e.preventDefault();

        const block = anc.getAttribute("href").substr(1);

        document.getElementById(block).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}
}
scrolls()

$("#mail_send").on("submit", function (e) {
    e.preventDefault();
    
    const form = $(this),
          name = $("input[name=name]"),
          email = $("input[name=email]"),
          massenge = $("textarea[name=messange]"),
          btn = $("button[type=submit]"),
          formData = new FormData(form[0]);

    if(name.val() == ""){
        notify("Fill in the name");
        return false;
    }
    if( email.val() == ""){
        notify("Fill in the email");
        return false;
    }
    if(massenge.val() == ""){
        notify("You did not write a message");
        return false;
    }
        $.ajax({
            type: "post",
            url: "mail/conf.php?cmd=email",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                try {
                    resObg = JSON.parse(response);
                    notify(resObg["message"]);
                    setTimeout(function(){
                        if(resObg["message"] == "The letter has been sent"){
                            
                            name.val("");
                            email.val("");
                            massenge.val("");
                        }
                    }, 1000)
                } catch (e) {
                    notify("server error")
                }
            }
        });
        
    
})
function notify(message){
    $(".warning").html(message);
}




window.addEventListener("load", async () =>{
    if("serviceWorker" in navigator){
        try {
            await navigator.serviceWorker.register('./sw.js')
            console.log("worker app")
        }catch (e) {
            console.log(e)
        }
    }
})