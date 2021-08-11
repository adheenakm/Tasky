
const taskContainer=document.querySelector(".task_container");

let globalTaskData = []; //array to store the task data

const generateHTML = (taskData) =>

        `<div id="${taskData.id}" class="col-md-6 col-lg-4 mt-4  mb-4">
        <div class="card">

        <div class="card-header d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-primary"><i class="fal fa-pencil"></i></button>
          <button type="button" class="btn btn-outline-danger"><i class="fal fa-trash "></i></button>
        </div>

        <div class="card-body">
          <img src="${taskData.image}" alt="image" class="card-img">
          <h5 class="card-title mt-4">${taskData.title}</h5>
          <p class="card-text">${taskData.description}</p>
          <span class="badge bg-primary ">${taskData.type}</span>
        </div>

        <div class="card-footer ">
          <button type="button" class="btn btn-outline-primary">Open Task</button>
        </div> 
        
        </div>
      </div>`;

  const insertToDOM = (newcard) =>
      taskContainer.insertAdjacentHTML("beforeend",newcard);




const addNewCard = () =>
{
    //get data
    const taskData={
        id: `${Date.now()}`,
        title: document.getElementById("taskTitle").value,
        image: document.getElementById("imageURL").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };

    globalTaskData.push(taskData);

    //update local storage
    localStorage.setItem("tasky",JSON.stringify({cards: globalTaskData}));

    //generate html code

      const newcard = generateHTML(taskData);
      //inject to DOM
      insertToDOM(newcard);

      //clear the form
      document.getElementById("taskTitle").value="";
      document.getElementById("imageURL").value="";
      document.getElementById("taskType").value="";
      document.getElementById("taskDescription").value="";

      return;
    
};
//funtion to execute onload
const loadExistingCards = () =>
{
  //check local storage
  const getdata= localStorage.getItem("tasky");

  //parse json data, it exists
  if(!getdata) 
   return;

  const taskCards = JSON.parse(getdata);

  globalTaskData= taskCards.cards;
  
  globalTaskData.map((taskData) =>
  {
     //generate HTML
     const newcard = generateHTML(taskData);
       
      //inject to DOM
      insertToDOM(newcard);
      
      return;

  });
};
