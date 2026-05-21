
const studentRoster = [];

// 1. JAVASCRIPT CONSTRUCTOR FUNCTION
function Student(name, age, course) {
    this.name = name;
    this.age = parseInt(age);
    this.course = course;

    // Object Method 1: Introduce Student
    this.introduce = function () {
        alert(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    };
    // Object Method 2: Output Course Details
    this.showCourseDetails = function () {
        alert(`${this.name} is enrolled in the "${this.course}" program.`);
    };
}
// 2. DOM ELEMENTS SELECTORS
const studentForm = document.getElementById('student-form');
const nameInput = document.getElementById('student-name');
const ageInput = document.getElementById('student-age');
const courseInput = document.getElementById('student-course');
const tableBody = document.getElementById('student-table-body');

// Metric Selectors
const totalStudentsCountEl = document.getElementById('total-students-count');
const activeCoursesCountEl = document.getElementById('active-courses-count');
const averageAgeEl = document.getElementById('average-age');

// Live Widget Selectors
const digitalClockEl = document.getElementById('digital-clock');
const studyTimerEl = document.getElementById('study-timer');
const toggleTimerBtn = document.getElementById('toggle-timer-btn');

// 3. CORE LOGIC & METRIC UPDATE FUNCTIONS
// Compute stats dynamically and re-render dashboard numerical values
function updateDashboardMetrics() {
    totalStudentsCountEl.textContent = studentRoster.length;
    if (studentRoster.length === 0) {
        activeCoursesCountEl.textContent = '0';
        averageAgeEl.textContent = '0';
        return;
    }
    // Extract unique active courses
    const uniqueCourses = [...new Set(studentRoster.map(s => s.course))];
    activeCoursesCountEl.textContent = uniqueCourses.length;
    // Calculate dynamic mean average age
    const totalAge = studentRoster.reduce((sum, student) => sum + student.age, 0);
    const averageAge = totalAge / studentRoster.length;
    averageAgeEl.textContent = averageAge.toFixed(1);
}

function renderRoster() {
    tableBody.innerHTML = ''; // Reset UI view to prevent duplicate mutations

    studentRoster.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${student.name}</strong></td>
            <td>${student.age}</td>
            <td><span class="course-badge">${student.course}</span></td>
            <td>
                <button class="action-btn btn-intro" data-index="${index}"><i class="fa-solid fa-comment"></i> Greet</button>
                <button class="action-btn btn-course" data-index="${index}"><i class="fa-solid fa-circle-info"></i> Info</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
tableBody.addEventListener('click', function (e) {
    const targetButton = e.target.closest('.action-btn');
    if (!targetButton) return;
    const studentIndex = targetButton.getAttribute('data-index');
    const targetedStudentObj = studentRoster[studentIndex];
    if (targetButton.classList.contains('btn-intro')) {
        targetedStudentObj.introduce(); // Execution of Object Method 1
    } else if (targetButton.classList.contains('btn-course')) {
        targetedStudentObj.showCourseDetails(); // Execution of Object Method 2
    }
});
// Capture Form submits, generate objects, update structures instantly
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const age = ageInput.value;
    const course = courseInput.value;
    const newStudent = new Student(name, age, course);
    studentRoster.push(newStudent);
    renderRoster();
    updateDashboardMetrics();
    // Reset fields to focus empty values
    studentForm.reset();
});
// 4. TIMERS & LIVE AUTO REFRESH FEATURES (setInterval)
// Component A: real-time accurate digital clock tracking
function runDigitalClock() {
    setInterval(() => {
        const now = new Date();
        digitalClockEl.textContent = now.toLocaleTimeString();
    }, 1000);
}
// Component B: Production Pomodoro style Study Timer scope
let timerInterval = null;
let totalSecondsElapsed = 0;
let isTimerRunning = false;
function formatTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}
function handleStudyTimer() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        toggleTimerBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        timerInterval = setInterval(() => {
            totalSecondsElapsed++;
            studyTimerEl.textContent = formatTimerDisplay(totalSecondsElapsed);
        }, 1000);
        toggleTimerBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isTimerRunning = !isTimerRunning;
}
toggleTimerBtn.addEventListener('click', handleStudyTimer);
// Initialize Timing Loop Systems on Window Mount
window.addEventListener('DOMContentLoaded', () => {
    runDigitalClock();
});