# HNG Frontend Stage 1A — Advanced Todo Card

An enhanced version of the Stage 0 Todo Card with interactive state management, editing capabilities, and dynamic behavior.

This stage transforms the static card into a mini state-driven UI component with real user interaction patterns.

---

## 🚀 Live Demo  
https://eniola-henry.github.io/HNG-FrontEnd-stage0/

---

## 📌 What Changed from Stage 0

Stage 0 was mostly static UI with basic logic.  
Stage 1A introduces real interaction and state synchronization.

New capabilities:
- Editable task (full edit mode with form)
- Status control (dropdown + checkbox sync)
- Dynamic priority updates
- Expand / collapse description
- Real-time time updates with overdue detection
- Visual state transitions (Done, Overdue, In Progress)

---

## 🧠 New Design Decisions

### 1. Centralized State Object
All data is controlled through a single state object.

Benefits:
- Predictable updates
- Easier debugging
- Cleaner structure

---

### 2. Render-Based UI Updates
UI updates are handled through render functions instead of scattered DOM updates.

Functions used:
- renderAll()
- renderStatus()
- renderPriority()
- renderContent()

---

### 3. Dynamic Time Logic
Time is calculated using:
- Date.now()
- state.due

This ensures accurate countdown and overdue detection.

---

### 4. Edit Mode with State Backup
Before editing:
- A copy of state is stored

On cancel:
- Original state is restored

---

### 5. Synchronized Status System
These stay in sync:
- Checkbox
- Status badge
- Status dropdown

Rules:
- Checkbox → Done
- Dropdown controls state
- Unchecking Done → Pending

---

## 🧪 New Test IDs Added

- test-todo-edit-form
- test-todo-edit-title-input
- test-todo-edit-description-input
- test-todo-edit-priority-select
- test-todo-edit-due-date-input
- test-todo-save-button
- test-todo-cancel-button
- test-todo-status-control
- test-todo-priority-indicator
- test-todo-expand-toggle
- test-todo-collapsible-section
- test-todo-overdue-indicator

All Stage 0 test IDs are still present.

---

## ⚙️ Features

### Edit Mode
- Opens form with current values
- Save updates task
- Cancel restores previous values
- Focus returns correctly

---

### Status Control
Supports:
- Pending
- In Progress
- Done

Dropdown and checkbox stay synchronized.

---

### Priority Indicator
Visual change based on:
- Low
- Medium
- High

---

### Expand / Collapse
- Works for long descriptions
- Keyboard accessible
- Uses aria-expanded and aria-controls

---

### Time Management
- Updates every 60 seconds
- Shows:
  - Due in X days
  - Due in X hours
  - Overdue by X
- Stops when task is Done
- Displays "Completed"

---

### Overdue State
- Visible indicator
- Styling changes when overdue

---

## ♿ Accessibility Notes

- Semantic HTML (article, section, form, time)
- Proper labels for inputs
- Keyboard navigation supported
- Focus management in edit mode
- aria-live="polite" for time updates
- Expand toggle uses aria-expanded and aria-controls

---

## 📱 Responsiveness

- Mobile-first design
- Works on:
  - 320px
  - 768px
  - 1024px+
- Edit form stacks on mobile
- No layout breaking with long content

---

## ⚠️ Known Limitations

- Only one todo card (not a full app)
- No data persistence
- No backend integration
- Time updates every 60 seconds (not real-time seconds)

---

## 🛠 Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript

---

## 🎯 Key Learning Outcome

- State-driven UI without frameworks
- Synchronizing multiple UI controls
- Managing dynamic data (time, status)
- Building accessible interactive components

---
 📷 Preview
<img width="1366" height="609" alt="image" src="https://github.com/user-attachments/assets/e2a7710b-0bf6-4c2b-9888-850baf1b32f2" />

---

## 👤 Author

Built by: Henry

---

## 📄 License

For educational purposes — HNG Internship Stage 1A
