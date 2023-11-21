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

    fetch("../parser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "markdown=" + encodeURIComponent(markdownText),
    })
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("preview-container").innerHTML = html;
      });
  });
});
