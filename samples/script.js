// -----------------------------
// 文字種変換
// -----------------------------
function kataToHira(str) {
  return str.replace(/[\u30a1-\u30f6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

function hiraToKata(str) {
  return str.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}

// -----------------------------
// kuromoji 初期化
// -----------------------------
kuromoji
  .builder({
    dicPath: "https://unpkg.com/kuromoji@0.1.2/dict/",
  })
  .build((err, tokenizer) => {
    if (err) {
      document.getElementById("out").textContent =
        "kuromoji 初期化エラー: " + err;
      return;
    }

    // -----------------------------
    // 変換ボタン
    // -----------------------------
    document.getElementById("btn").onclick = () => {
      const text =
        document.getElementById("text").value ||
        document.getElementById("text").placeholder;

      const useKata = document.getElementById("katakana").checked;
      const useKataPippi = document.getElementById("katappippi").checked;
      const useShort = document.getElementById("shortpippi").checked;

      const tokens = tokenizer.tokenize(text);

      let result = tokens
        .map((t) => {
          const reading = t.reading || t.surface_form;
          return kataToHira(reading);
        })
        .join("");

      // 置換語決定
      let replaceWord = "ぴっぴ";
      if (useShort) replaceWord = "ぴ";

      // 変換部分のみカタカナ
      if (useKataPippi || useKata) {
        replaceWord = hiraToKata(replaceWord);
      }

      // 「し」→ぴっぴ
      result = result.replace(/し/g, replaceWord);

      // 全文カタカナ
      if (useKata) {
        result = hiraToKata(result);
      }

      document.getElementById("out").textContent = result;
    };
  });

// -----------------------------
// リセット
// -----------------------------
document.getElementById("clear").onclick = () => {
  document.getElementById("text").value = "";
  document.getElementById("out").textContent = "";
};

// -----------------------------
// コピー
// -----------------------------
document.getElementById("copy").onclick = () => {
  const text = document.getElementById("out").textContent;
  if (!text) {
    alert("コピーする内容がないよ！");
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    alert("コピーしたよ！");
  });
};

// -----------------------------
// ツイート
// -----------------------------
document.getElementById("tweet").onclick = () => {
  const text = document.getElementById("out").textContent;
  if (!text) {
    alert("ツイートする内容がないよ！");
    return;
  }

  const tweetText = `${text}\n\nhttps://pippi.oto.im/pippi/`;
  const url =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(tweetText);

  window.open(url, "_blank");
};
