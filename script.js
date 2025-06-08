let lastChar = "";
let promises = [];
let count = 0;
async function send() {
  if (promises.length > 0) {
    return;
  }
  let url = document.getElementById("url").value.trim();
  let question = document.getElementById("question").value.trim();
  const number = parseInt(document.getElementById("count").value.trim());
  if (!url || !question || !number) {
    alert("すべての項目を入力してください");
    return;
  }
  if (question.length > 498) {
    alert("498文字以内で入力してください");
    return;
  }
  if (isNaN(number) || number <= 0 || number > 500) {
    alert("送信数は1から500の間で入力してください");
    return;
  }
  document.getElementById("log").innerHTML = "";
  count = 0;
  const prefix = "https://sunq.me/";
  if (!url.startsWith(prefix)) {
    alert("URLはhttps://sunq.me/から始まる必要があります");
    return;
  }
  url = url.split("https://sunq.me/").pop();
  console.log("----------------noxq----------------");
  console.log("User ID:", url);
  console.log("Question:", question);
  console.log("Count:", number);
  console.log("------------------------------------");
  const time = new Date();
  console.log("Start Time:", time.toLocaleString());

  const log = document.getElementById("log");
  const li = document.createElement("li");
  li.textContent = `送信開始: ${number}件`;
  log.appendChild(li);
  for (let i = 0; i < number; i++) {
    promises.push(sending(question, url));
  }
  await Promise.allSettled(promises);
  promises = [];
  const timeEnd = new Date();
  const finish = `${Math.floor((timeEnd.getTime() - time.getTime()) / 1000)}秒`;
  console.log("End Time:", timeEnd.toLocaleString());
  console.log("Total Time:", finish);
  li.textContent = `送信完了: ${count}件, 合計時間: ${finish}`;
}
function random() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomChar;
  do {
    randomChar = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  } while (randomChar === lastChar);
  lastChar = randomChar;
  return randomChar;
}
async function sending(question, userId) {
  const log = document.getElementById("log");
  const end = document.getElementById("end");
  let res = "不明";
  try {
    res = await fetch("https://sunq.me/ia.php", {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: `d=${userId}&type=1&content=${question + ":" + random()}`,
      method: "POST",
    });
  } catch (e) {}
  count++;
  const message = `${count}.送信完了`;
  const li = document.createElement("li");
  li.textContent = message;
  log.appendChild(li);
  end.textContent = `現在の送信数: ${count}件`;
}
