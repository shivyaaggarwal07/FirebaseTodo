    function load()
    {
        var username = document.getElementById("stuname");
        username.value = localStorage.getItem('name');
    }
        function add_task(){
                var input_box=document.getElementById("inputbox");
                var input_date=document.getElementById("inputdate");
                //checking if input box and date are not empty
                if(input_box.value.length != 0 && input_date.value.length != 0 )
                {
                    //our boxes have data and we take
                    var key = ele.ref().child("unfinished_task/").push().key;
                    var task = {
                        title: input_box.value,
                        date: input_date.value,
                        key: key
                    };
                                var updates={};
                    updates[/unfinished_task/ + key] = task;
                    ele.ref().update(updates);
                    create_unfinished_task();
                    console.log(key);
                    }
            console.log("Task added");
        }
        function create_unfinished_task()
        {
            unfinished_task_container = document.getElementsByClassName("container")[0]; //first element of the unfinished task
            unfinished_task_container.innerHTML=""; //empty our container so in case if we have more data then it just clears the container
                //array of tasks
                task_array=[];
                //now we want the snapshot and for snapshot we want to get the child data we want to get key and data value of child
                ele.ref("unfinished_task").once('value',function(snapshot){
                    snapshot.forEach(function(childSnapshot){
                        var childkey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        //converting objects to array
                        task_array.push(Object.values(childData));
                    });
                    for(var i = 0; i<task_array.length;i++)
                    {
                        console.log(task_array[i]);
                        task_date = task_array[i][0];
                        task_key = task_array[i][1];
                        task_title = task_array[i][2];

                        task_container = document.createElement("div");
                        task_container.setAttribute("class", "task_container");
                        task_container.setAttribute("data-key", task_key);


                        // TASK DATA 
                        task_data = document.createElement('div');
                        task_data.setAttribute('id', 'task_data');

                        title = document.createElement('p');
                        title.setAttribute('id', 'task_title');
                        title.setAttribute('contenteditable', false);
                        title.innerHTML = task_title;

                        date = document.createElement('p');
                        date.setAttribute('id', 'task_date');
                        date.setAttribute('contenteditable', false);
                        date.innerHTML = task_date;


                        //TASK TOOLS
                        task_tool = document.createElement('div');
                        task_tool.setAttribute('id', 'task_tool');

                        task_done_btn = document.createElement('button');
                        task_done_btn.setAttribute('id', 'task_done_btn');
                        task_done_btn.setAttribute('onclick', "task_done(this.parentElement.parentElement, this.parentElement)"); //first parent element is the btn of the task_tool and second is task of the task_tool
                        fa_done = document.createElement('i');
                        fa_done.setAttribute('class', 'fas fa-check');

                        task_edit_btn = document.createElement('button');
                        task_edit_btn.setAttribute('id', 'task_edit_btn');
                        task_edit_btn.setAttribute('onclick', "task_edit(this.parentElement.parentElement,this)"); //here second parent element is the button
                        fa_edit = document.createElement('i');
                        fa_edit.setAttribute('class', 'fas fa-pencil-alt');

                        task_delete_btn = document.createElement('button');
                        task_delete_btn.setAttribute('id', 'task_delete_btn');
                        task_delete_btn.setAttribute('onclick', "task_delete(this.parentElement.parentElement)");
                        fa_delete = document.createElement('i');
                        fa_delete.setAttribute('class', 'fas fa-trash-alt');


                        unfinished_task_container.append(task_container);
                        task_container.append(task_data);
                        task_container.append(task_title);
                        task_container.append(task_date);

                        task_container.append(task_tool);
                        task_tool.append(task_done_btn);
                        task_done_btn.append(fa_done);
                        task_tool.append(task_edit_btn);
                        task_edit_btn.append(fa_edit);
                        task_tool.append(task_delete_btn);
                        task_delete_btn.append(fa_delete);

                    }
                })
        }
        function create_finished_task()
        {
            finished_task_container = document.getElementsByClassName("container")[1]; //first element of the unfinished task
            finished_task_container.innerHTML=""; //empty our container so in case if we have more data then it just clears the container
                //array of tasks
                task_array=[];
                //now we want the snapshot and for snapshot we want to get the child data we want to get key and data value of child
                ele.ref("finished_task").once('value',function(snapshot){
                    snapshot.forEach(function(childSnapshot){
                        var childkey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        //converting objects to array
                        task_array.push(Object.values(childData));
                    });
                    for(var i = 0; i<task_array.length;i++)
                    {
                        console.log(task_array[i]);
                        task_date = task_array[i][0];
                        task_key = task_array[i][1];
                        task_title = task_array[i][2];

                        task_container = document.createElement("div");
                        task_container.setAttribute("class", "task_container");
                        task_container.setAttribute("data-key", task_key);


                        // TASK DATA 
                        task_data = document.createElement('div');
                        task_data.setAttribute('id', 'task_data');

                        title = document.createElement('p');
                        title.setAttribute('id', 'task_title');
                        title.setAttribute('contenteditable', false);
                        title.innerHTML = task_title;

                        date = document.createElement('p');
                        date.setAttribute('id', 'task_date');
                        date.setAttribute('contenteditable', false);
                        date.innerHTML = task_date;

                        finished_task_container.append(task_container);
                        task_container.append(task_data);
                        task_container.append(task_title);
                        task_container.append(task_date);

                    }
                })
        }
    function task_done(task, task_tool){
        //take out the task from the unfininshed container to finished container
        finished_task_container = document.getElementsByClassName("container")[1];
        task.removeChild(task_tool);
        //append to the finished container
        finished_task_container.append(task);
           var key = task.getAttribute("data-key");
                    var task_obj = {
                        title: task.childNodes[0].childNodes[0].innerHTML,          //title is inside task_container then task_data as task_data contains two arrays so title is it at 0 index   
                        date: task.childNodes[0].childNodes[1].innerHTML,           // date is inside task_container then task_data contains date at 1 index
                        key: key
                    };
                                var updates={};
                    updates["/finished_task/" + key] = task_obj;
                    ele.ref().update(updates);

                    //delete our task from the unfinished container
                            task_delete(task);
                            create_finished_task();
    }
    function task_edit(task, edit_button){
        // edit_button.style.backgroundColor= "#ffed83" //yellowish
        // edit_button.style.color="#fff"; //white
        edit_button.setAttribute("id", "task_edit_btn_editing");
        edit_button.setAttribute("onclick","finish_edit(this.parentElement.parentElement,this)");

        title=task.childNodes[0].childNodes[0];
        title.setAttribute("contenteditable", true);

        date=task.childNodes[0].chidlNodes[1];
        date.setAttribute("contenteditable" ,  true);

    }
    function finish_edit(task,edit_button)
    {
        edit_button.style.backgroundColor="fff";
        edit_button.style.color="#000";
        edit_button.setAttribute("id", "task_edit_btn")
        edit_button.setAttribute("onclick","task_edit(this.parentElement.parentElement,this)");


        title=task.childNodes[0].childNodes[0];
        title.setAttribute("contenteditable",false);

        date=task.childNodes[0].childNodes[1];
        date.setAttribute("contenteditable",false);

        //change in firebase to new editted task
        var key = task.getAttribute("data-key");
                    var task_obj = {
                        title: task.childNodes[0].childNodes[0].innerHTML,          //title is inside task_container then task_data as task_data contains two arrays so title is it at 0 index   
                        date: task.childNodes[0].childNodes[1].innerHTML,           // date is inside task_container then task_data contains date at 1 index
                        key: key
                    };
                                var updates={};
                    updates[/unfinished_task/ + key] = task_obj;
                    ele.ref().update(updates);

    }
    function task_delete(task){
        // console.log("task delete");
        key = task.getAttribute("data-key");
        task_to_remove = ele.ref("unfinished_task/" + key);
        task_to_remove.remove();

//remove from html view
        task.remove();
    }

