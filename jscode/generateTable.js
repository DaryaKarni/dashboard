export function generateTable(arr, arrType){
  const table = document.querySelector("#table");//try const
  table.innerHTML = "";
  const trHeaders = document.createElement("tr");
  let headers = [];
  const arrSort = ["Company Name", "Project Name", "Budget",
     "Employee Capacity", "Estimated Income", "Name",
     "Surname", "Age", "Position", "Salary",
     "Estimated Payment", "Project", "Projected Incomes"];
  const arrFind = ["Company Name", "Project Name", "Name",
    "Surname", "Position", "Project"];
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  if(arrType === "projects"){
    headers = ["Company Name", "Project Name", "Budget", "Employee Capacity",
               "Employees", "Estimated Income", "Actions"];
  } else if(arrType === "employees"){
    headers = ["Name", "Surname", "Age", "Position", "Salary", "Estimated Payment",
               "Project", "Projected Incomes", "Actions"];
  }
  headers.forEach((header) => {
    const th = document.createElement("th");
    const container = document.createElement("div");
    container.classList.add("th-container");
    container.textContent = header;
    if(arrSort.some(value => value === header)){
      const sortButton = document.createElement("button");
      sortButton.textContent = "⇅";
      sortButton.classList.add("th-buttons");
      container.appendChild(sortButton);
    }
    if(arrFind.some(value => value === header)){
      const findButton = document.createElement("button");
      findButton.textContent = "⌕";
      findButton.classList.add("th-buttons");
      container.appendChild(findButton);
    }
    th.appendChild(container);
    trHeaders.appendChild(th);
  })
  thead.appendChild(trHeaders)
  table.appendChild(thead);

  for(let obj of arr){
    let tr = document.createElement("tr");
    for(let key in obj){
      let td = document.createElement("td");
      td.classList.add(key);
      if(key === "employees"){
        const button = document.createElement("button");
        button.classList.add("blue-button");
        button.id = "showEmployees";
        const employeesCount = obj[key].length;
        button.textContent = `Show Employees (${employeesCount})`;
        td.appendChild(button);
      } else if(key === "project"){
        const button = document.createElement("button");
        button.classList.add("blue-button");
        button.id = "showAssignments";
        const projectCount = obj[key].length;
        if(projectCount){
          button.textContent = `Show Assignments (${projectCount})`;//добавить capacity
          td.appendChild(button);
        } else{
          td.textContent = "-";
        }
      } else{
        if(key === "estimated-income" || key === "projected-income"
          || key === "profit"){
          let value = +obj[key];
          value >= 0 ? td.style.color = "green" :
           td.style.color = "red";
           td.textContent = `$${obj[key]}`;
        } else {
          td.textContent = obj[key];
        }
      }
      tr.appendChild(td);
    }
    const delButton = document.createElement("button");
    delButton.textContent = "Delete";
    delButton.classList.add("red-button");
    const td = document.createElement("td");
    td.classList.add("td-buttons");
    if(arrType === "employees"){
      const availButton = document.createElement("button");
      const assignButton = document.createElement("button");
      availButton.classList.add("purple-button");
      assignButton.classList.add("blue-button");
      availButton.textContent = "Availability";
      assignButton.textContent = "Assign" ;
      td.appendChild(availButton);
      td.appendChild(assignButton);
    }
    td.appendChild(delButton);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
}
