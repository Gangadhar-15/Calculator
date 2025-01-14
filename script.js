// Function to show input fields for subject credits in SGPA calculation
function showSubjectInputs() {
    let subjectsCount = document.getElementById('subjectsCount').value;
    let studentType = document.querySelector('input[name="studentType"]:checked')?.value;

    if (!studentType) {
        alert("Please select the student type (Diploma or Regular).");
        return;
    }

    if (subjectsCount && subjectsCount > 0) {
        let container = document.getElementById('sgpaSubjects');
        container.innerHTML = '<label>Enter Credit Points for each subject:</label>';
        for (let i = 1; i <= subjectsCount; i++) {
            container.innerHTML += `<div class="form-group">
                                        <label for="subject${i}">Subject ${i} Credit Points:</label>
                                        <input type="number" id="subject${i}" placeholder="Subject ${i} Credit Points" step="0.01" required>
                                    </div>`;
        }
        container.style.display = 'block';

        // Ensure button text changes to 'Calculate SGPA'
        let button = document.querySelector('.calculator-box button');
        button.textContent = "Calculate SGPA";
        button.setAttribute('onclick', 'calculateSGPA()');
    }
}

// Function to calculate SGPA
function calculateSGPA() {
    let subjectsCount = document.getElementById('subjectsCount').value;
    let studentType = document.querySelector('input[name="studentType"]:checked')?.value;

    if (!studentType) {
        alert("Please select the student type (Diploma or Regular).");
        return;
    }

    let sumCredits = 0;

    for (let i = 1; i <= subjectsCount; i++) {
        let credit = parseFloat(document.getElementById(`subject${i}`).value);
        if (isNaN(credit) || credit < 0) {
            alert("Please enter valid credit points for each subject.");
            return;
        }
        sumCredits += credit;
    }

    let divisor = studentType === "diploma" ? 23 : 20;
    let sgpa = sumCredits / divisor;
    document.getElementById('sgpaResult').textContent = `SGPA: ${sgpa.toFixed(2)}`;
}

// Function to calculate CGPA
// Function to show semester inputs based on student type
function showSemesterInputs() {
    let studentType = document.querySelector('input[name="studentTypeCGPA"]:checked')?.value;
    if (!studentType) {
        alert("Please select the student type (Lateral Entry or Regular).");
        return;
    }

    let semesters = studentType === "lateral" ? [3, 4] : [1, 2, 3, 4];
    let container = document.getElementById('cgpaSemesters');
    container.innerHTML = '<label>Enter SGPA for each semester:</label>';

    semesters.forEach(sem => {
        container.innerHTML += `<div class="form-group">
                                    <label for="sem${sem}">Semester ${sem} SGPA:</label>
                                    <input type="number" id="sem${sem}" placeholder="Semester ${sem} SGPA" step="0.01" required>
                                </div>`;
    });

    container.style.display = 'block';
}

// Function to calculate CGPA
function calculateCGPA() {
    let studentType = document.querySelector('input[name="studentTypeCGPA"]:checked')?.value;

    if (!studentType) {
        alert("Please select the student type (Lateral Entry or Regular).");
        return;
    }

    let semesters = studentType === "lateral" ? [3, 4] : [1, 2, 3, 4];
    let totalSGPA = 0;

    for (let sem of semesters) {
        let sgpa = parseFloat(document.getElementById(`sem${sem}`).value);
        if (isNaN(sgpa) || sgpa < 0 || sgpa > 10) {
            alert(`Please enter valid SGPA for Semester ${sem} (0-10).`);
            return;
        }
        totalSGPA += sgpa;
    }

    let cgpa = totalSGPA / semesters.length;
    document.getElementById('cgpaResult').textContent = `CGPA: ${cgpa.toFixed(2)}`;
}
