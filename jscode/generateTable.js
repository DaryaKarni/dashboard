import { handleSort, handleFind, handleDel, handleShow } from "./table.js";

export function generateTable(arr, arrType, selector = "#table") {
  const table = document.querySelector(selector);
  table.innerHTML = "";

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const trHeaders = document.createElement("tr");

  const arrSort = ["Company Name", "Project Name", "Budget", "Employee Capacity", "Estimated Income", "Name", "Surname", "Age", "Position", "Salary", "Estimated Payment", "Project", "Projected Incomes"];
  const arrFind = ["Company Name", "Project Name", "Name", "Surname", "Position", "Project"];

  let headers = [];
  let keys = [];

  if (arrType === "projects") {
    headers = ["Company Name", "Project Name", "Budget", "Employee Capacity", "Employees", "Estimated Income", "Actions"];
    keys = ["company-name", "project-name", "budget", "employee-capacity", "employees", "estimated-income"];
  } else if (arrType === "employees") {
    headers = ["Name", "Surname", "Age", "Position", "Salary", "Estimated Payment", "Project", "Projected Incomes", "Actions"];
    keys = ["name", "surname", "age", "position", "salary", "estimated-payment", "project", "projected-income"];
  } else if (arrType === "showEmployees" || arrType === "showAssignments") {
    headers = [arrType === "showEmployees" ? "Employee" : "Project", "Capacity", "Fit", "Vacation", "Effective", "Revenue", "Cost", "Profit", "Actions"];
    keys = [arrType === "showEmployees" ? "employee" : "project", "capacity", "fit", "vacation", "effective", "revenue", "cost", "profit"];
  }

  headers.forEach((header, index) => {
    const th = document.createElement("th");
    const container = document.createElement("div");
    container.className = "th-container";
    container.textContent = header;

    if (arrSort.includes(header)) {
      const btn = document.createElement("button");
      btn.textContent = "⇅";
      btn.className = "th-buttons";
      btn.onclick = () => handleSort(th, index);
      container.appendChild(btn);
    }
    if (arrFind.includes(header)) {
      const btn = document.createElement("button");
      btn.textContent = "⌕";
      btn.className = "th-buttons";
      btn.onclick = handleFind;
      container.appendChild(btn);
    }
    th.appendChild(container);
    trHeaders.appendChild(th);
  });

  thead.appendChild(trHeaders);
  table.appendChild(thead);

  arr.forEach(obj => {
    const tr = document.createElement("tr");

    keys.forEach(key => {
      const td = document.createElement("td");
      td.className = key;
      const value = obj[key];

      if (key === "employees" || key === "project") {
        if (Array.isArray(value) && value.length > 0) {
          const btn = document.createElement("button");
          btn.className = "blue-button";
          btn.textContent = `${key === "employees" ? 'Show Employees' : 'Show Assignments'} (${value.length})`;

          btn._subData = value;
          btn._subType = key === "employees" ? "showEmployees" : "showAssignments";
          btn._subTitle = `${key === "employees" ? 'Employees' : 'Assignments'}`;

          btn.onclick = (e) => handleShow(e, generateTable);
          td.appendChild(btn);
        } else {
          td.textContent = "-";
        }
      } else if (["estimated-income", "projected-income", "salary", "budget", "estimated-payment", "profit", "revenue", "cost"].includes(key)) {
        const num = parseFloat(value) || 0;
        td.style.color = num >= 0 ? "green" : "red";
        td.textContent = `$${value}`;
      } else {
        td.textContent = value || "-";
      }
      tr.appendChild(td);
    });

    const actionTd = document.createElement("td");
    actionTd.className = "td-buttons";

    if (arrType === "showEmployees" || arrType === "showAssignments") {
      const editBtn = document.createElement("button");
      editBtn.className = "blue-button";
      editBtn.textContent = "Edit";
      const unBtn = document.createElement("button");
      unBtn.className = "red-button";
      unBtn.textContent = arrType === "showEmployees" ? "Remove" : "Unassign";
      actionTd.append(editBtn, unBtn);
    } else {
      if (arrType === "employees") {
        const avBtn = document.createElement("button");
        avBtn.className = "purple-button";
        avBtn.textContent = "Availability";
        const asBtn = document.createElement("button");
        asBtn.className = "blue-button";
        asBtn.textContent = "Assign";
        actionTd.append(avBtn, asBtn);
      }
      const delBtn = document.createElement("button");
      delBtn.className = "red-button";
      delBtn.textContent = "Delete";
      delBtn.onclick = () => handleDel(tr);
      actionTd.appendChild(delBtn);
    }

    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
}
