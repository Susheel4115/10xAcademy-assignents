const dom = (s) => document.querySelector(s);
const form = dom(".form");
const strCount = dom(".count");
const threadCount = dom(".threadCount");
const threadBox = dom(".thread-box");
let size = 275;
let tweetsArr = [];
function textInfo(obj) {
  let length = obj.value.length;
  strCount.innerHTML = length;
  threadCount.innerHTML = Math.ceil(length / size);
  length > size ? (obj.style.color = "black") : (obj.style.color = "teal");
}
function displayUI(listParent, arr = []) {
  listParent.innerHTML = arr
    .map((el, i) => {
      return `
        <article class="thread" data-index="${i}">

        <div class="tools">
        <span class="index">${i < 9 ? "0" + (i + 1) : i + 1}</span>
        <span class="close" data-index="${i}">✖️</span>
         
        </div>

        <p class="tweet" data-index="${i}">
        ${el}
        </p>

        </article>
        `;
    })
    .join("");
}

function tweets(str) {
  let splitOnWhiteSpace = str.split(" ");
  let result = [];
  let totalLength = 0;
  let sentence = "";
  for (let i = 0; i < splitOnWhiteSpace.length; i++) {
    let curWord = splitOnWhiteSpace[i];
    let curWordLength = curWord.length;
    sentence += curWord + " ";
    totalLength += curWordLength + 1;
    if (totalLength >= size) {
      sentence = sentence.trim(); //trim my whole p tag
      let lengthDiff = sentence.length - size;
      if (lengthDiff > 0) {
        let lastIndexOfWhiteSpace = sentence.lastIndexOf(" ");
        sentence = sentence.slice(0, lastIndexOfWhiteSpace);
        i--;
      }
      result.push(sentence);
      totalLength = 0;
      sentence = "";
    }
    if (
      i === splitOnWhiteSpace.length - 1 &&
      totalLength <= size &&
      sentence !== ""
    ) {
      result.push(sentence.trim());
    }
  }

  return result;
}
function thread(e) {
  e.preventDefault();

  tweetsArr = tweets(dom(".textarea").value);

  displayUI(threadBox, tweetsArr);
}

form.addEventListener("submit", thread);
