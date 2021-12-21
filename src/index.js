import './style.css';
import { Task } from './card.js';
import { createCard, addTaskWindow } from './html.js';
import { getDatabase } from './data.js';

let main = document.getElementById('main');
let addBtn = document.getElementById('add-button');

//addTaskWindow()
addBtn.addEventListener('click', addTaskWindow);








function testCard() {
   let testCard = Task("test name", "test description", "test date", "test project", false);
   let htmlCard = createCard(testCard);
   console.log(htmlCard);

   //main.appendChild(htmlCard);
}

//testCard();

function testData() {
   let data = getDatabase();
   let testCard = Task("test name", `test description
   lala
   alala
   lala`, "test date", "test project", false);

   data.addTask(testCard);
   data.addTask(testCard);
   data.addTask(testCard);

   for (let i = 0; i < data.getData().length; i++){
      // console.log(data.getData()[i]);
      main.appendChild(createCard(data.getData()[i]));
   }

   console.log(data.getData());   

}

testData();

//testData();




// let testCard = Task("test name", "test description", "test date", "test project", false);
// console.log(testCard)
// console.log(testCard.getName())

// createCard(testCard);