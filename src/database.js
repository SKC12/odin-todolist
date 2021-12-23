import { add } from 'date-fns';
import { Task } from './card.js';

let storedDatabase;

const Database = () => {
    let data = [];

    const getData = () => {return data};

    const addTask = (task) => {
        data.push(task);
        saveToLocalStorage();
    };

    const removeTask = (taskName, taskDate) => {
        removeTaskFromArray(data, taskName, taskDate);
        saveToLocalStorage();
    };

    const flipTask = (task) =>{
        removeTask(task.getName(), task.getDate());
        task.flipStatus();
        addTask(task);
    }

    const getDataAsString = () => {
        let newArr = [];
        for (let i=0; i<data.length; i++){
            newArr.push(data[i].getJSON());
        }
        return JSON.stringify(newArr);
    }

    const saveToLocalStorage = () => {
        localStorage.setItem('data', getDataAsString());
        console.log('saved');
    }
    
    const loadFromLocalStorate = () => {
        let retrievedArr = JSON.parse(localStorage.getItem('data') || '[]');
        data = [];
        for (let i=0; i<retrievedArr.length;i++){
            addTask(Task(retrievedArr[i].name, retrievedArr[i].description, retrievedArr[i].date, retrievedArr[i].project, retrievedArr[i].status));
        }
    }


    return {getData, addTask, removeTask, getDataAsString, saveToLocalStorage, loadFromLocalStorate, flipTask}    
};

function getDatabase(command = "get"){
    if (command==="fresh"){
        storedDatabase = Database();
        return storedDatabase;
    } else if(command ==='get'){
        // console.log(storedDatabase)
        if(storedDatabase == undefined){
            storedDatabase = Database();
            return storedDatabase;;
        } else {
            return storedDatabase;
        }        
    }
}


function removeTaskFromArray(array, taskName, taskDate) {
    let i = 0;
    while (i<array.length){
        if (array[i].getName()===taskName && array[i].getDate() === taskDate){
            array.splice(i, 1);
        } else {
            i++
        };
    };
};

export {
    Database,
    getDatabase
};