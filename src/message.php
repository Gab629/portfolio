<?php
  $name = htmlspecialchars($_GET['fullname']);
  $email = htmlspecialchars($_GET['email']);
  $phone = htmlspecialchars($_GET['phone']);
  $comment = $_GET['comment']; // Removed htmlspecialchars here
  if(!empty($email) && !empty($comment)){
    $subject = "From: $name <$email>";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage:\n$comment\n\nRegards,\n$name";
    mail("gab.gauthier2002@gmail.com",$subject,$body);
    header("Location: https://ggauthier.ca/contact.html");
  }else{
    echo "Email and message field is required!";
  }
?>
