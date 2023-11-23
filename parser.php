<?php
require 'vendor/autoload.php';

$parsedown = new Parsedown();

/**
 * 各タグを <p> タグで囲む
 *
 * @param string $html HTMLコンテンツ
 * @return string <p> タグで囲まれたHTML
 */
function wrapTagsWithP($html): string {
    // 正規表現を使って、各タグを <p> タグで囲む
    return preg_replace('/(<(h[1-6]|p|div|ul|ol|pre|blockquote)[^>]*>)(.*?)(<\/\2>)/is', '<p>$1$3$4</p>', $html);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $markdown = $_POST['markdown'];

    if ($_POST['state'] === 'preview') {
        echo $parsedown->text($markdown);
    } elseif (in_array($_POST['state'], ['html', 'download'])) {
        $htmlEscaped = htmlspecialchars($parsedown->text($markdown));
        $lines = explode("\n", $htmlEscaped); 

        foreach ($lines as $line) {
            echo "<p>" . $line . "</p>\n";
        }
    }
}
