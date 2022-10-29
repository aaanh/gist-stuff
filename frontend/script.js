const copyButtonLabel = "Copy URL";

// you can use a class selector instead if you, or the syntax highlighting library adds one to the 'pre'. 
let blocks = document.querySelectorAll("pre");

blocks.forEach((block) => {
    let button = document.createElement("button");
    button.innerText = copyButtonLabel;
    button.addEventListener("click", copyCode);
    block.appendChild(button);
});

async function copyCode(event) {
  const button = event.srcElement;
  const pre = button.parentElement;
  let code = pre.querySelector("p");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  
  button.innerText = "Code Copied";
  
  setTimeout(()=> {
    button.innerText = copyButtonLabel;
  },1000)
}