//Data Import: Import CSV data into web applications for further processing or storage.

// Exmaples to possible use later:

/* 
damianImg.addEventListener("mouseover", imageChanging());
damianImg.addEventListener("mouseleave", imageChanging());

function imageChanging(){
if(damianImg.src.indexOf("media/damian.jpg") != -1){
    damianImg.src = ("media/damian2.jpg");
} else if(damianImg.src.indexOf("media/damian2.jpg") != -1){
    damianImg.src = ("media/damian3.jpg");
} else {
    damianImg.src = ("media/damian.jpg");
}
}c hhjn kjj XW
function click(label, event) {
    console.log(`[${label}] click`)
}

damianImg.addEventListener('click', click.bind(damianImg, 'damian'));
fooImg.addEventListener('click', click.bind(fooImg, 'foo'));

damianImg.addEventListener("mouseleave", () => imageChanging('argument'));

omatic semicolon insertion can cause the problems when you put the { on next line. The famous example is return {a: 'b'};, here { is on the next line of return. when semicolon is added the same statement is treated as return; and next line {.. which results in returning undefined when you expect object, read more stackoverflow.com/questions/2846283/… and jamesallardice.com/… – 
Tushar
 CommentedOct 2, 2015 at 5:27 
*/

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const content = e.target.result;
        document.getElementById("output").innerText = content;
      };
      reader.readAsText(file);
    }
  });

function validateCSV(data) {
  const requiredHeaders = ["Name", "Age", "Email"];
  const headers = data[0];
  return requiredHeaders.every((header) => headers.includes(header));
}

// CSV to Datastructure. 

// (Product, amount, quantity) )

const products = [(,,), (,,), (,,)];


products.forEach((product) => 
{
  // Check availability
  if (checkAvailability(product)) {processProduct(product); } 
  else { console.log(`Product ${product.name} is not available.`);}
});

function checkAvailability(product) { return true; }
function processProduct(product) { 
    console.log(`Processing product: ${product.name}`);
}