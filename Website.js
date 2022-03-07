window.onload = function () {
   fetchBoxes();
}

let boxesData = [];
async function fetchBoxes() {
   const boxesArray = await (await fetch('DomJsonData.json')).json();
   boxesData = boxesArray.boxes;
   constructBoxesinUI();
}

function constructBoxesinUI() {
   for (let i = 0; i < boxesData.length; i++) {
      let boxDiv = document.createElement("div");
      boxDiv.setAttribute("class", "boxElement" + i);
      boxDiv.setAttribute("id", "boxElement" + i);
      document.getElementById("box_container").appendChild(boxDiv);
      document.getElementById("boxElement" + i).style.height = '150px';
      document.getElementById("boxElement" + i).style.width = '150px';
      document.getElementById("boxElement" + i).setAttribute("title", boxesData[i].title);
      document.getElementById("boxElement" + i).style.backgroundColor = boxesData[i].color;
      let boxDivTitle = document.createElement("span");
      boxDivTitle.innerHTML = boxesData[i].title;
      document.getElementById("boxElement" + i).appendChild(boxDivTitle);
   }
}

function mySubmitFunction(event) {
   event.preventDefault();
   let formData = {
      'title': document.getElementById("textfield1").value ? document.getElementById("textfield1").value : '',
      'color': document.getElementById("textfield2").value ? document.getElementById("textfield2").value : ''
   };
   constructandInitiateFilter(formData);
}

function constructandInitiateFilter(formData) {
   console.log(boxesData);
   let filteredArray = [];
   if (formData.title) {
      filteredArray = boxesData.filter((box) => {
         return formData.title.toLowerCase() === box.title.toLowerCase();
      });
   }
   if (formData.color) {
      filteredArray = boxesData.filter((box) => {
         return formData.color.toLowerCase() === box.color.toLowerCase();
      });
   }
   if (formData.color && formData.title) {
      filteredArray = boxesData.filter((box) => {
         return (formData.color.toLowerCase() === box.color.toLowerCase()
            && formData.title.toLowerCase() === box.title.toLowerCase()
         );
      });
   }
   boxesData = filteredArray;
   clearUI();
   constructBoxesinUI();
}

function clearUI() {
   const myNode = document.getElementById("box_container");
   while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild);
   }
}
