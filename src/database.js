let storedDatabase;

const Database = () => {
    let data = [];

    const getData = () => {return data};

    const addTask = (task) => data.push(task);

    const removeTask = (taskName, taskDate) => {
        removeTaskFromArray(data, taskName, taskDate);
    }

    return {getData, addTask, removeTask}    
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