const state = {
  title: 'Redesign the onboarding flow',
  description: 'Audit the current 7-step onboarding and cut friction where it hurts. Progressive disclosure, tighter copy, and a cleaner first-run experience.',
  priority: 'High',
  dueDate: '2026-04-18',
  due: new Date('2026-04-18T18:00:00Z'),
  status: 'In Progress',
  isDone: false,
  isExpanded: false,
};

let timerInterval = null;
let backupState = null;

const COLLAPSE_THRESHOLD = 100;

const card = document.getElementById('todo-card');
const cardView = document.getElementById('card-view');
const editFormEl = document.getElementById('edit-form');
const checkbox = document.getElementById('done');
const titleEl = document.getElementById('todo-title');
const descEl = document.getElementById('todo-description');
const collapsible = document.getElementById('collapsible-section');
const expandToggle = document.getElementById('expand-toggle');
const priorityBadge = document.getElementById('priority-badge');
const priorityIndicator = document.getElementById('priority-indicator');
const statusBadge = document.getElementById('status-badge');
const statusControl = document.getElementById('status-control');
const timer = document.getElementById('timer');
const overdueIndicator = document.getElementById('overdue-indicator');
const dueDateDisplay = document.getElementById('due-date-display');
const editBtn = document.getElementById('edit-btn');
const editTitleInput = document.getElementById('edit-title');
const editDescInput = document.getElementById('edit-desc');
const editPriorityInput = document.getElementById('edit-priority');
const editDueInput = document.getElementById('edit-due');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');

function startTimer() {
  if (timerInterval) return;
  timerInterval = setInterval(tick, 60000);
}

function stopTimer() {
  if (!timerInterval) return;
  clearInterval(timerInterval);
  timerInterval = null;
}

function setStatus(status) {
  state.status = status;
  state.isDone = status === 'Done';
  renderStatus();

  if (state.isDone) {
    stopTimer();
    timer.textContent = 'Completed';
    overdueIndicator.hidden = true;
    card.classList.remove('is-overdue');
  } else {
    startTimer();
    tick();
  }
}

function toggleExpand() {
  state.isExpanded = !state.isExpanded;
  syncCollapse();
}

function saveEdit(title, description, priority, dueDate) {
  state.title = title;
  state.description = description;
  state.priority = priority;
  state.isExpanded = false;

  if (dueDate) {
    state.dueDate = dueDate;
    state.due = new Date(dueDate + 'T18:00:00Z');
  }

  renderAll();
  startTimer();
  tick();
}

function renderStatus() {
  const { status, isDone } = state;

  statusBadge.textContent = status;
  statusBadge.className =
    'status-pill' +
    (status === 'Done' ? ' done' : '') +
    (status === 'In Progress' ? ' in-progress' : '');

  statusControl.value = status;
  checkbox.checked = isDone;

  titleEl.classList.toggle('done', isDone);
  card.classList.toggle('done', isDone);
}

function renderPriority() {
  const cls = state.priority.toLowerCase();

  priorityBadge.textContent = state.priority;
  priorityBadge.className = `pill ${cls}`;
  priorityBadge.setAttribute('aria-label', `Priority: ${state.priority}`);

  priorityIndicator.className = `priority-dot ${cls}`;

  card.classList.remove('high', 'medium', 'low');
  card.classList.add(cls);
}

function renderContent() {
  titleEl.textContent = state.title;
  descEl.textContent = state.description;

  const d = state.due;

  dueDateDisplay.textContent = 'Due ' + d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  dueDateDisplay.setAttribute('datetime', d.toISOString());
}

function syncCollapse() {
  const isLong = state.description.length > COLLAPSE_THRESHOLD;

  expandToggle.hidden = !isLong;
  expandToggle.setAttribute('aria-controls', 'collapsible-section');
  expandToggle.setAttribute('aria-expanded', state.isExpanded ? 'true' : 'false');

  if (!isLong) {
    collapsible.classList.remove('collapsed');
    return;
  }

  if (state.isExpanded) {
    collapsible.classList.remove('collapsed');
    expandToggle.textContent = 'Show less';
  } else {
    collapsible.classList.add('collapsed');
    expandToggle.textContent = 'Show more';
  }
}

function tick() {
  if (state.isDone) return;

  const diff = state.due - Date.now();
  const abs = Math.abs(diff);
  const mins = Math.floor(abs / 60000);
  const hours = Math.floor(abs / 3600000);
  const days = Math.floor(abs / 86400000);
  const late = diff < 0;

  let label;

  if (!late) {
    if (days >= 2) label = `Due in ${days} days`;
    else if (days === 1) label = 'Due tomorrow';
    else if (hours >= 1) label = `Due in ${hours} hours`;
    else label = `Due in ${mins} minutes`;
  } else {
    if (mins < 5) label = 'Due now!';
    else if (hours < 1) label = `Overdue by ${mins} minutes`;
    else if (days < 1) label = `Overdue by ${hours} hours`;
    else label = `Overdue by ${days} days`;
  }

  timer.textContent = label;
  timer.className = late ? 'overdue-timer' : '';
  overdueIndicator.hidden = !late;
  card.classList.toggle('is-overdue', late);
}

function renderAll() {
  renderContent();
  syncCollapse();
  renderPriority();
  renderStatus();
}

function openEdit() {
  backupState = structuredClone(state);

  editTitleInput.value = state.title;
  editDescInput.value = state.description;
  editPriorityInput.value = state.priority;
  editDueInput.value = state.dueDate;

  cardView.hidden = true;
  editFormEl.hidden = false;
  card.classList.add('editing');
  editTitleInput.focus();
}

function closeEdit() {
  cardView.hidden = false;
  editFormEl.hidden = true;
  card.classList.remove('editing');
  editBtn.focus();
}

checkbox.addEventListener('change', () => {
  setStatus(checkbox.checked ? 'Done' : 'Pending');
});

statusControl.addEventListener('change', () => {
  setStatus(statusControl.value);
});

expandToggle.addEventListener('click', toggleExpand);

expandToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleExpand();
  }
});

editBtn.addEventListener('click', openEdit);

cancelBtn.addEventListener('click', () => {
  if (backupState) Object.assign(state, backupState);
  renderAll();
  closeEdit();
  startTimer();
  tick();
});

editFormEl.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeEdit();
});

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const title = editTitleInput.value.trim();
  if (!title) return editTitleInput.focus();

  saveEdit(
    title,
    editDescInput.value.trim(),
    editPriorityInput.value,
    editDueInput.value || null
  );

  closeEdit();
});

document.querySelector('[data-testid="test-todo-delete-button"]').addEventListener('click', () => {
  alert('Delete clicked');
});

renderAll();
startTimer();
tick();
