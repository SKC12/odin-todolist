import './style.css';
import { Task } from './card.js';
import { createCard, addTaskWindow, populateCards, initTaskbar } from './html.js';
import { getDatabase } from './database.js';

initTaskbar();

let main = document.getElementById('main');
let addBtn = document.getElementById('add-button');

addBtn.addEventListener('click', addTaskWindow);

init();

function init() {
   getDatabase().loadFromLocalStorate();
   populateCards();
}


function testData() {
   let data = getDatabase();
   let testCard = Task("First Task", `lorem ipsum
   lorem ipsum
   lorem ipsum lorem ipsum`, "2021-12-22", "Programming", false);

   let testCard2 = Task("Second Task", `lorem ipsum
   lorem ipsum
   lorem ipsum lorem ipsum`, "2021-12-23", "Programming", false);

   let testCard3 = Task("Third Task", `lorem ipsum
   lorem ipsum
   lorem ipsum lorem ipsum`, "2021-12-22", "", false);

   let testCard4 = Task("Fourth Task", `lorem ipsum
   lorem ipsum
   lorem ipsum lorem ipsum`, "2022-01-21", "Laundry", false);

   data.addTask(testCard);
   data.addTask(testCard2);
   data.addTask(testCard3);
   data.addTask(testCard4);

   populateCards();

}

//testData();

