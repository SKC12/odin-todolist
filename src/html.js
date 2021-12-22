import { Task } from './card.js';
import { getDatabase } from './database.js';
import { isToday, isThisWeek } from 'date-fns';

const initTaskbar = () => {
    let all = document.getElementById('all');
    let today = document.getElementById('today');
    let week = document.getElementById('week');

    all.addEventListener('click', () => populateCards());
    today.addEventListener('click', () => populateCards('today'));
    week.addEventListener('click', () => populateCards('week'));
}

const createCard = (task) => {
    let main = document.getElementById('main');

    let container = document.createElement('div');
    container.classList.add('card-container');

    let topContainer = document.createElement('div');
    topContainer.classList.add('card-top-container');

    let leftSide = document.createElement('div');
    leftSide.classList.add('card-left');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    let name = document.createElement('p');
    name.classList.add('card-name');
    name.innerText = task.getName();

    leftSide.appendChild(checkbox);
    leftSide.appendChild(name);

    let rightSide = document.createElement('div');
    rightSide.classList.add('card-right');

    let date = document.createElement('p');
    date.classList.add('card-date');
    date.innerText = task.getDate();

    let remove = document.createElement('button');
    remove.classList.add('card-remove');
    remove.innerText = 'Del'
    remove.addEventListener('click', () => {
        let data = getDatabase().getData();
        for (let i = 0; i < data.length; i++) {
            if (data[i].getName() === task.getName() && data[i].getDate() === task.getDate()) {
                data.splice(i, 1);
            };
        };
        main.removeChild(container)
    });

    rightSide.appendChild(date);
    rightSide.appendChild(remove);

    let project = document.createElement('div');
    project.classList.add('card-project');
    project.innerText = task.getProject();

    topContainer.appendChild(leftSide);
    topContainer.appendChild(project);
    topContainer.appendChild(rightSide);

    let botContainer = document.createElement('div');
    botContainer.classList.add('card-bot-container');

    let description = document.createElement('div');
    description.classList.add('card-description');
    description.innerText = task.getDescription();

    botContainer.appendChild(description);

    container.appendChild(topContainer);

    container.addEventListener('mouseover', () => container.appendChild(botContainer));

    container.addEventListener('mouseout', () => container.removeChild(botContainer));


    main.appendChild(container);

    return container;
};

const addTaskWindow = () => {

    let main = document.getElementById('main');

    let addWindow = document.createElement('div');
    addWindow.id = 'add-window';

    let topBar = document.createElement('div');
    topBar.classList.add('add-top-bar');

    let closeButton = document.createElement('button');
    closeButton.classList.add('add-close-button');
    closeButton.innerText = 'X';

    closeButton.addEventListener('click', () => main.removeChild(addWindow));

    topBar.appendChild(closeButton);

    let nameLabel = document.createElement('label');
    nameLabel.classList.add('add-label');
    nameLabel.innerText = "Name:";

    let nameInput = document.createElement('input');
    nameInput.classList.add('add-name');

    let dateLabel = document.createElement('label');
    dateLabel.classList.add('add-label');
    dateLabel.innerText = 'Date:';

    let dateInput = document.createElement('input');
    dateInput.classList.add('add-date');
    dateInput.type = 'date';

    let descriptionLabel = document.createElement('label');
    descriptionLabel.classList.add('add-label');
    descriptionLabel.innerText = 'Description:';

    let descriptionInput = document.createElement('textarea');
    descriptionInput.classList.add('add-description');

    let projectLabel = document.createElement('label');
    projectLabel.classList.add('add-label');
    projectLabel.innerText = 'Project:'

    let projectInput = document.createElement('input');
    projectInput.classList.add('add-project');

    let confirmButton = document.createElement('button');
    confirmButton.id = "add-confirm-button";
    confirmButton.innerText = 'Add';
    confirmButton.addEventListener('click', () => {
        let task = Task(nameInput.value, descriptionInput.value, dateInput.value, projectInput.value);
        if (isValid(task)) {
            addTask(task);
            main.removeChild(addWindow);
        } else {
            alert('Name and Date must be filled!');
        }
    });

    addWindow.appendChild(topBar);
    addWindow.appendChild(nameLabel);
    addWindow.appendChild(nameInput);
    addWindow.appendChild(dateLabel);
    addWindow.appendChild(dateInput);
    addWindow.appendChild(descriptionLabel);
    addWindow.appendChild(descriptionInput);
    addWindow.appendChild(projectLabel);
    addWindow.appendChild(projectInput);
    addWindow.appendChild(confirmButton);



    main.appendChild(addWindow);
};

function addTask(task) {
    let data = getDatabase();
    data.addTask(task);

    populateCards();
};

function clearCards() {
    let main = document.getElementById('main');
    let cards = main.getElementsByClassName('card-container');

    while (cards[0]) {
        cards[0].parentNode.removeChild(cards[0]);
    };
};

function populateCards(filter = 'all') {
    clearCards();
    let data = getDatabase().getData();
    data.sort((a, b) => {
        return new Date(a.getDate()) - new Date(b.getDate());
    });
    if (filter === 'all') {
        //console.log(data);
        for (let i = 0; i < data.length; i++) {
            createCard(data[i]);
        };
    } else if (filter === 'today') {
        for (let i = 0; i < data.length; i++) {
            if (isToday(new Date(data[i].getDate() + " 00:00"))) {
                createCard(data[i]);
            };
        };
    } else if (filter === 'week') {
        let today = new Date()

        for (let i = 0; i < data.length; i++) {
            let date = new Date(data[i].getDate() + " 00:00");
            if (isThisWeek(date, { weekStartsOn: 1 })) {
                createCard(data[i]);
            };
        };

    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].getProject()===filter) {
                createCard(data[i]);
            };
        };
    };

    populateProjects()
};

function populateProjects() {
    let dataArray = getDatabase().getData();
    let projectContainer = document.getElementById('projects-container');

    while (projectContainer.lastElementChild) {
        projectContainer.removeChild(projectContainer.lastElementChild);
    }

    let projectsArray = [];
    for (let i = 0; i < dataArray.length; i++) {
        let proj = dataArray[i].getProject();
        if (proj !== "" && !projectsArray.includes(proj)) {
            projectsArray.push(proj);
        }
    }


    for (let i = 0; i < projectsArray.length; i++) {
        let projectHTML = document.createElement('p');
        projectHTML.classList.add('taskbar-project');
        projectHTML.innerText = projectsArray[i];
        projectHTML.addEventListener('click', () => populateCards(projectsArray[i]));

        projectContainer.appendChild(projectHTML);
    }
}

function isValid(task) {
    return (task.getName() !== "" && task.getDate() !== "")

};

export {
    createCard, addTaskWindow, populateCards, initTaskbar
}