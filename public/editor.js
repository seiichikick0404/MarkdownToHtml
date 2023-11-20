require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs",
  },
});
require(["vs/editor/editor.main"], function () {
  var editor = monaco.editor.create(
    document.getElementById("editor-container"),
    {
      value: "",
      language: "markdown",
    }
  );

  // エディタの内容が変更されたときにプレビューを更新
  editor.onDidChangeModelContent(function () {
    var markdownText = editor.getValue();
    // TODO: MarkdownをHTMLに変換し、プレビューに表示
    document.getElementById("preview-container").innerHTML = markdownText; // 仮の表示
  });
});
