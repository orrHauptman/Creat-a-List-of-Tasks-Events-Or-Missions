const table = document.getElementById("table")
const tr_mission = document.createElement("tr");
table.appendChild(tr_mission);
const tr_event_time = document.createElement("tr");
const tr_event_place = document.createElement("tr");
table.appendChild(tr_event_time);
table.appendChild(tr_event_place);

const tasks_table = document.getElementById("table_tasks");
var input_date_mission;
var input_time_mission;
var input_event_date;
var input_event_time;
var input_event_place;

var check_mission = 0;
var check_event = 0;
document.addEventListener("DOMContentLoaded", function () {
    load_tasks();
    const type_of_task = document.getElementById("task_type");
    const form = document.getElementById("form");
    type_of_task.addEventListener("change", function ()
    {
        tr_mission.style.display = "none";
        tr_event_time.style.display = "none";
        tr_event_place.style.display = "none";
        
        if (type_of_task.value == "mission")
        {
            Mission.buid_format();
        }

        if (type_of_task.value === "event")
        {
            Event.buid_format();
        }

        
    });
    form.addEventListener("submit", function (event)
    {
        const task_name = document.getElementById("name");
        const task_description = document.getElementById("description");

        var user_task;
        event.preventDefault();
        switch (true)
        {
            case (type_of_task.value == "task"):
                user_task = new Task(task_name.value, task_description.value);
                user_task.new_task();
                save_task();
                break;
            case (type_of_task.value == "mission"):
                user_task = new Mission(task_name.value, task_description.value, input_date_mission.value, input_time_mission.value);
                user_task.new_task();
                break;
            case (type_of_task.value == "event"):
                alert("event");
                user_task = new Event(task_name.value, task_description.value, input_event_time.value, input_event_place.value)
                user_task.new_task();
            default:
                break;
        }

        show_tasks_table();
    });
});

function show_tasks_table()
{
    tasks_table.style.display = "";
}
function hide_tasks_table()
{
    tasks_table.style.display = "none";
}
function delete_task (tr)
{
    if (tr != null)
    {
        alert("yep");
    }

}
class Task
{
    constructor(task_name, task_description) {
        this.task_name = task_name;
        this.task_description = task_description;
    }
    new_task()
    {
        show_tasks_table()
        const tr_tasks = document.createElement("tr");
        const th_tasks_name = document.createElement("th");
        let td_tasks_description = document.createElement("td");
        this.td_tasks_time = document.createElement("td");
        let td_tasks_finished = document.createElement("td");
    
        tasks_table.appendChild(tr_tasks);
        tr_tasks.appendChild(th_tasks_name);
        tr_tasks.appendChild(td_tasks_description);
        
        tr_tasks.appendChild(this.td_tasks_time);
        tr_tasks.appendChild(td_tasks_finished);

        th_tasks_name.innerHTML = this.task_name;
        td_tasks_description.innerHTML = this.task_description;
        th_tasks_name.classList.add("th_name");

        const input_delete = document.createElement("input");
        input_delete.type = "button";
        input_delete.value = "Delete";
        input_delete.classList.add("button_delete");
        td_tasks_finished.appendChild(input_delete);

        input_delete.addEventListener("click", () => {
            this.deleteTask(tr_tasks); 
        });
    }
    deleteTask(row) {
        row.remove(); 
        if (tasks_table.getElementsByTagName("tr").length == 1)
        {
            hide_tasks_table();
        }
    } 
}

class Mission extends Task
{
    constructor(task_name, task_description,task_date,task_time)
    {
        super(task_name, task_description);
        this.mission_date = task_date;
        this.mission_time = task_time;
        
    }
    static buid_format()
    {
        tr_mission.style.display = "";

        if (check_mission == 0)
        {
            const th_mission = document.createElement("th");
            const td_mission = document.createElement("td");
            const th_lable_mission = document.createElement("label");
            th_lable_mission.textContent = "Finish the mission until : ";
            th_mission.appendChild(th_lable_mission);
            tr_mission.appendChild(th_mission);

            input_date_mission = document.createElement("input");
            input_date_mission.type = "date";
            input_time_mission = document.createElement("input");
            input_time_mission.type = "time";

            td_mission.appendChild(input_date_mission);
            td_mission.appendChild(input_time_mission);
            tr_mission.appendChild(td_mission)

            input_date_mission.setAttribute("required", "");
            input_time_mission.setAttribute("required", "");

            check_mission = 1;
        }
    }
    new_task()
    {
        super.new_task();
        this.td_tasks_time.innerHTML = "Complete until : " + this.mission_date + " , at "+ this.mission_time;
        save_task();
    }



}

class Event extends Task
{
    constructor(task_name, task_description, task_time,task_place)
    {
        super(task_name, task_description);
        this.event_time = task_time;
        this.event_place = task_place;
    }
    static buid_format()
    {
        tr_event_time.style.display = "";
        tr_event_place.style.display = "";
        if (check_event == 0) {
            const th_event_time = document.createElement("th");
            const td_event_time = document.createElement("td");
            const lable_event_time = document.createElement("label");
            lable_event_time.textContent = "Event starts at : ";
            th_event_time.appendChild(lable_event_time);
            tr_event_time.appendChild(th_event_time);

            input_event_date = document.createElement("input");
            input_event_date.type = "date";
            input_event_time = document.createElement("input");
            input_event_time.type = "time";

            td_event_time.appendChild(input_event_date);
            td_event_time.appendChild(input_event_time);
            tr_event_time.appendChild(td_event_time)

            const th_event_place = document.createElement("th");
            const td_event_place = document.createElement("td");
            const lable_event_place = document.createElement("label");
            lable_event_place.textContent = "Event takes place at : ";
            tr_event_place.appendChild(th_event_place);
            tr_event_place.appendChild(td_event_place);
            th_event_place.appendChild(lable_event_place);

            input_event_place = document.createElement("input");
            input_event_place.type = "text";

            td_event_place.appendChild(input_event_place);


            input_event_place.setAttribute("required", "");
            input_event_date.setAttribute("required", "");
            input_event_time.setAttribute("required", "");

            check_event = 1;
        }
    }
    new_task()
    {
        super.new_task();
        this.td_tasks_time.innerHTML = "Event takes place in " + this.event_place + ". The event is at: " + this.event_time;
        save_task();
    }
}

function save_task()
{
    const lines = tasks_table.getElementsByTagName("tr");
    const arr_save = [];
    for (let i = 1; i < lines.length; i++)
    {
        const td_save = lines[i].getElementsByTagName("td");;
        const th_task_name_save = td_save[0].textContent;
        const td_task_description = td_save[1].textContent;
        const td_task_place_or_time = td_save[2].textContent;
        arr_save.push({th_task_name_save,td_task_description,td_task_place_or_time})
    }
    localStorage.setItem("tasks", JSON.stringify(arr_save))
}

function load_tasks() {
    const load_the_tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    load_the_tasks.forEach(task => {
        const tr_tasks = document.createElement("tr");
        const th_task_name = document.createElement("th");
        th_task_name.classList.add("th_name");
        th_task_name.innerHTML = task.th_task_name_save;
        tr_tasks.appendChild(th_task_name);
        const td_task_description = document.createElement("td");
        td_task_description.innerHTML = task.td_task_description;
        tr_tasks.appendChild(td_task_description);
        const td_task_place_or_time = document.createElement("td");
        td_task_place_or_time.innerHTML = task.td_task_place_or_time;
        tr_tasks.appendChild(td_task_place_or_time);
        const td_tasks_finished = document.createElement("td");
        const input_delete = document.createElement("input");
        input_delete.type = "button";
        input_delete.value = "Delete";
        input_delete.classList.add("button_delete");
        td_tasks_finished.appendChild(input_delete);
        input_delete.addEventListener("click", () => {
            tr_tasks.remove();
            if (tasks_table.getElementsByTagName("tr").length == 1) {
                hide_tasks_table();
            }
        });
        tr_tasks.appendChild(td_tasks_finished);
        tasks_table.appendChild(tr_tasks);
    });
    if (load_the_tasks.length > 0) {
        show_tasks_table();
    }
}