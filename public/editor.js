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
        displayAsHtml();
      } else if (
        clickedLabel === "Highlight: ON" ||
        clickedLabel === "Highlight: OFF"
      ) {
        updateHighlightButton(label);
        updatePreview();
      } else {
        stateMap.state = "download";
        downloadHtml();
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
      body:
        "markdown=" +
        encodeURIComponent(stateMap.markdown) +
        "&state=" +
        stateMap["state"],
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
 * HTMLを文字列として出力
 *
 * @param {void}
 */
function displayAsHtml() {
  const markdownText = stateMap.markdown;

  fetch("../parser.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "markdown=" +
      encodeURIComponent(markdownText) +
      "&state=" +
      stateMap.state,
  })
    .then((response) => response.text())
    .then((htmlString) => {
      // HTML 文字列を表示
      document.getElementById("preview-content-area").innerHTML = htmlString;
    })
    .catch((error) => console.error("Error:", error));
}

function downloadHtml() {
  const markdownText = stateMap.markdown;

  // PHP スクリプトへのリクエストを送信
  fetch("../parser.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "markdown=" +
      encodeURIComponent(markdownText) +
      "&state=" +
      stateMap.state,
  })
    .then((response) => response.blob())
    .then((blob) => {
      // ダウンロードリンクを作成し、クリックイベントをトリガー
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "export.html";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })
    .catch((error) => console.error("Error:", error));
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
