const DUE = new Date('2026-04-18T18:00:00Z');

function tick() {
  const diff = DUE - Date.now();
  const abs = Math.abs(diff);
  const mins  = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  const days  = Math.floor(abs / 86400000);
  const late  = diff < 0;

  let label;
  if (!late) {
    if (days >= 2)       label = `Due in ${days} days`;
    else if (days === 1) label = 'Due tomorrow';
    else if (hours >= 1) label = `Due in ${hours} hours`;
    else                 label = `Due in ${mins} minutes`;
  } else {
    if (mins < 5)        label = 'Due now!';
    else if (hours < 1)  label = `Overdue by ${mins} minutes`;
    else if (days < 1)   label = `Overdue by ${hours} hours`;
    else                 label = `Overdue by ${days} days`;
  }

  const el = document.getElementById('timer');
  el.textContent = label;
  el.className = late ? 'overdue' : '';
}

tick();
setInterval(tick, 60000);

document.getElementById('done').addEventListener('change', function () {
  const title = document.querySelector('[data-testid="test-todo-title"]');
  const badge = document.getElementById('status-badge');
  const done  = this.checked;

  title.classList.toggle('done', done);
  badge.textContent = done ? 'Done' : 'In Progress';
  badge.className   = done ? 'status-pill done' : 'status-pill';
  document.querySelector('[data-testid="test-todo-card"]').classList.toggle('done', done);
});

document.querySelector('[data-testid="test-todo-edit-button"]').onclick = () => {
    console.log("edit clicked");
};

document.querySelector('[data-testid="test-todo-delete-button"]').onclick = () => {
    alert("Delete clicked");
};