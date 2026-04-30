export function generateTable(arr, arrType){
  const table = document.querySelector("#table");//try const
  table.innerHTML = "";
  const trHeaders = document.createElement("tr");
  let headers;
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
    let th = document.createElement("th");
    th.textContent = header;
    trHeaders.appendChild(th);
  })
  thead.appendChild(trHeaders)
  table.appendChild(thead);
  for(let obj of arr){
    let tr = document.createElement("tr");
    for(let key in obj){
      let td = document.createElement("td");
      td.textContent = obj[key];
      tr.appendChild(td);
    }
    let tdDel = document.createElement("td");
    tr.appendChild(tdDel);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
}
