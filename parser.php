<?php
require 'vendor/autoload.php';

$parsedown = new Parsedown();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $markdown = $_POST['markdown'];
    echo $parsedown->text($markdown);
}
