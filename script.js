const input = document.getElementById("input");
const btn = document.getElementById("btn");
const todo = document.getElementById("todo-list");


btn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputValut = input.value;
    console.log(inputValut);
    addTask(inputValut);
    input.value = "";
})

let serv = [];

function addTask(task, status = "unchecked") {
    if (task == "") return;
    const item = document.createElement('li');
    item.classList.add(("todo-task"));
    const TaskLabel = document.createElement('span');
    TaskLabel.innerHTML = task;



    const checkedTask = document.createElement('img');
    if (status == "unchecked") {
        checkedTask.src = 'checkbox-svgrepo-com.svg';
    }
    else {
        checkedTask.src = 'checkbox-check-svgrepo-com.svg';
    }
    const deleteTask = document.createElement('img');
    deleteTask.src = 'trash-bin-minimalistic-svgrepo-com.svg'

    let alldata = {
        "taskname": task,
        "status": status
    }

    checkedTask.addEventListener('click', () => {
        checkedTask.src = checkedTask.src.includes('checkbox-check-svgrepo-com.svg')
            ? 'checkbox-svgrepo-com.svg'
            : 'checkbox-check-svgrepo-com.svg';


        alldata.status == "checked" ? alldata.status = "unchecked" : alldata.status = "checked";
        localStorage.setItem("tasks", JSON.stringify(serv));
        console.log(alldata.status);
    });

    deleteTask.addEventListener('click', () => {
        serv.forEach((element,index)=>{
            if(element.taskname === task){
                serv.splice(index,1);
            }
        })
        item.remove();
        localStorage.setItem("tasks",JSON.stringify(serv));
    })
    item.append(TaskLabel, checkedTask, deleteTask);
    serv.push(alldata);
    todo.append(item);

    localStorage.setItem("tasks", JSON.stringify(serv));

}

function localData() {
    if (localStorage.getItem("tasks")) {
        let prevData = localStorage.getItem("tasks");
        prevData = JSON.parse(prevData);
        console.log(prevData);
        prevData.forEach(element => {
            addTask(element.taskname, element.status);
        });
    }
}

localData();