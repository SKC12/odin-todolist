const Task = (name, description, date, project, status) => {

    const getName = () => name;
    const getDescription = () => description;
    const getDate = () => date;
    const getProject = () => project;
    const getStatus = () => status;

    const flipStatus = () => {
        status = !status;
    }


    return {getName, getDescription, getDate, getProject, getStatus, flipStatus};
}


export {
    Task    
};
