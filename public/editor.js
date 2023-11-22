const stateMap = {
  markdown: "",
  state: "preview",
  highlight: true,
};

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

  editor.onDidChangeModelContent(function () {
    stateMap.markdown = editor.getValue();
    updatePreview();
  });

  document.querySelectorAll(".btn-group label").forEach((label) => {
    label.addEventListener("click", () => {
      const clickedLabel = label.textContent.trim();
      switch (clickedLabel) {
        case "Preview":
          stateMap.state = "preview";
          updatePreview();
          break;
        case "HTML":
          stateMap.state = "html";
          alert("HTMLが選択中");
          break;
        case "Highlight: ON":
          stateMap.highlight = !stateMap.highlight;
          updatePreview();
          break;
      }
    });
  });
});

/**
 * 変更をエディタに反映
 *
 * @return void
 */
function updatePreview() {
  if (stateMap.state === "preview") {
    fetch("../parser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "markdown=" + encodeURIComponent(stateMap.markdown),
    })
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("preview-content-area").innerHTML = html;

        if (stateMap.highlight) {
          document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightBlock(block);
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  }
}
