<?php
if($_GET["cmd"] == "email"){
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = htmlspecialchars($_POST["messange"]);
      $to      = 'user email';
      $subject = 'the subject';
      $headers = 'From: '.$email.' ' . "\r\n" .
          'Reply-To: '.$email.'' . "\r\n" .
          'X-Mailer: PHP/' . phpversion();
      
      $send = mail($to, $subject, $message, $headers);
        if($send){
          $resp = array("message" => "The letter has been sent");
              echo json_encode($resp);
        }else{
          $resp = array("message" => "The letter was not sent");
              echo json_encode($resp);
        }
}
?>