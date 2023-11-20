<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./public/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Markdown Editor</title>
</head>
<body>
    
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1 class="project-title">Markdown to HTML</h1>
            </div>
            <!-- Monaco Editor コンテナ -->
            <div class="col-md-6">
                <!-- 枠線のスタイルを追加 -->
                <div id="editor-container"></div>
            </div>
            <!-- プレビュー コンテナ -->
            <div class="col-md-6">
                <div id="preview-container"></div>
            </div>
        </div>
    </div>

    <script src="./node_modules/monaco-editor/min/vs/loader.js"></script>
    <script>
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' }});
        require(['vs/editor/editor.main'], function() {
            var editor = monaco.editor.create(document.getElementById('editor-container'), {
                value: '',
                language: 'markdown'
            });

            // エディタの内容が変更されたときにプレビューを更新
            editor.onDidChangeModelContent(function () {
                var markdownText = editor.getValue();
                // TODO: MarkdownをHTMLに変換し、プレビューに表示
                document.getElementById('preview-container').innerHTML = markdownText; // 仮の表示
            });
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>
</html>
