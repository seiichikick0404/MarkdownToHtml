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
      if (clickedLabel === "Preview") {
        stateMap.state = "preview";
        updatePreview();
      } else if (clickedLabel === "HTML") {
        stateMap.state = "html";
        alert("HTMLが選択中");
      } else if (
        clickedLabel === "Highlight: ON" ||
        clickedLabel === "Highlight: OFF"
      ) {
        updateHighlightButton(label);
        updatePreview();
      }
    });
  });
});

/**
 * 変更をエディタに反映
 *
 * @return {void}
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

/**
 * ハイライトボタンのテキストを更新して、ハイライトの状態（オンまたはオフ）を表示します。
 *
 * @param {HTMLElement} label
 */
function updateHighlightButton(label) {
  stateMap.highlight = !stateMap.highlight;
  if (stateMap.highlight) {
    label.textContent = "Highlight: ON";
  } else {
    label.textContent = "Highlight: OFF";
  }
}
