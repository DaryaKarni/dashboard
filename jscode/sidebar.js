  import data from "../data/data.json" with {type: "json"}
  import {generateTable} from "../jscode/generateTable.js"

  document.addEventListener("DOMContentLoaded", () => {
    const monthSelect = document.getElementById("month-select");
    const yearSelect = document.getElementById("year-select");
    let year = "2026";
    let month = "3";
    let date = year + "-" + month;
    const navProjects = document.getElementById("nav-projects");
    const navEmployees = document.getElementById("nav-employees");
    let category;
    let type = "projects";
    const tableTitle = document.querySelector(".table-title");
    const addProject = document.getElementById("button-add-project");
    const seedData = document.getElementById("button-seed-data");
    const addEmployee = document.getElementById("button-add-employee");
    function updateTable(){
      const monthData = data.monthlyData[date];
      if (monthData && monthData[type]){
        category = monthData[type];
      } else{
        category = [];
      }
      generateTable(category, type);
    }
    const handleNav = (event) => {
      type = event.target.dataset.type;
      updateTable();
      tableTitle.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      const total = document.querySelector(".total");
      if(type === 'employees'){
        total.classList.add('hidden');
        addProject.classList.add('hidden');
        seedData.classList.add('hidden');
        addEmployee.classList.remove('hidden');
        navProjects.classList.remove("nav-selected");
        navEmployees.classList.add("nav-selected");
      } else{
        total.classList.remove('hidden');
        addProject.classList.remove('hidden');
        seedData.classList.remove('hidden');
        addEmployee.classList.add('hidden');
        navProjects.classList.add("nav-selected");
        navEmployees.classList.remove("nav-selected");
      }

    }

    navProjects.addEventListener('click', handleNav);
    navEmployees.addEventListener('click', handleNav);
    handleNav({target: navProjects});

    const handleYearSelect = (event) => {
      year = event.target.value;
      date = year + "-" + month;
      updateTable();
    }
    const handleMonthSelect = (event) => {
      month = event.target.value;
      date = year + "-" + month;
      updateTable();
    }
    yearSelect.addEventListener('change', handleYearSelect);
    monthSelect.addEventListener('change', handleMonthSelect);
  });

  const sidebar = document.querySelector(".collapsible-sidebar");
  const burger = document.getElementById("burger");
  const buttonBack = document.getElementById("button-back");
  function hideContent(){
    sidebar.classList.toggle("hidden-left");
    buttonBack.classList.toggle("hidden");
  }
  burger.addEventListener('click', hideContent);
  buttonBack.addEventListener('click', hideContent)
