<?php
require 'vendor/autoload.php';

$parsedown = new Parsedown();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $markdown = $_POST['markdown'];
   
    if ($_POST['state'] === 'preview') {
        echo $parsedown->text($markdown);
    } elseif ($_POST['state'] === 'html') {
        echo htmlspecialchars($parsedown->text($markdown));
    }
}
