export function handleSort(targetTh, index) {
  const table = document.getElementById("table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  table.querySelectorAll('th').forEach(th => {
    if (targetTh !== th) {
      th.dataset.sortOrder = '';
      const btn = th.querySelector('.th-buttons');
      if (btn && btn.textContent !== "⌕") {
        btn.textContent = '⇅';
      }
    }
  });

  const currentOrder = targetTh.dataset.sortOrder;
  const newOrder = currentOrder === "asc" ? "desc" : "asc";
  const direction = newOrder === "asc" ? 1 : -1;

  rows.sort((rowA, rowB) => {
    if (!rowA.cells[index]) return 0;

    let valA = rowA.cells[index].textContent.replace('$', '').trim();
    let valB = rowB.cells[index].textContent.replace('$', '').trim();

    const a = isNaN(valA) || valA === "" ? valA.toLowerCase() : parseFloat(valA);
    const b = isNaN(valB) || valB === "" ? valB.toLowerCase() : parseFloat(valB);

    if (a < b) return -1 * direction;
    if (a > b) return 1 * direction;
    return 0;
  });

  targetTh.dataset.sortOrder = newOrder;
  const button = targetTh.querySelector("button");
  if (button) {
    button.textContent = newOrder === 'asc' ? '↑' : '↓';
  }

  rows.forEach(row => tbody.appendChild(row));
}

export function handleFind(event) {
  event.stopPropagation();
}

export function handleDel(tr){
  if (confirm("Delete this row?")) tr.remove();
}

export function handleShow(event, callback) {
  const data = event.currentTarget._subData;
  const type = event.currentTarget._subType;
  const title = event.currentTarget._subTitle || "Details";

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");

  if (data && data.length > 0) {
    modalTitle.textContent = title;
    modal.style.display = "flex"; 
    callback(data, type, "#modal-table");
  }
}

document.getElementById("close-modal")?.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});
