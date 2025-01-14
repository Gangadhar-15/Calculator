// Function to show input fields for subject credits in SGPA calculation
function showSubjectInputs() {
    let subjectsCount = document.getElementById('subjectsCount').value;
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
    let sumCredits = 0;

    for (let i = 1; i <= subjectsCount; i++) {
        let credit = parseFloat(document.getElementById(`subject${i}`).value);
        if (isNaN(credit) || credit < 0) {
            alert("Please enter valid credit points for each subject.");
            return;
        }
        sumCredits += credit;
    }

    let sgpa = sumCredits / 20;
    document.getElementById('sgpaResult').textContent = `SGPA: ${sgpa.toFixed(2)}`;
}

// Function to calculate CGPA
function calculateCGPA() {
    let sem1 = parseFloat(document.getElementById('sem1').value);
    let sem2 = parseFloat(document.getElementById('sem2').value);
    let sem3 = parseFloat(document.getElementById('sem3').value);
    let sem4 = parseFloat(document.getElementById('sem4').value);


    if (isNaN(sem1) || isNaN(sem2) || isNaN(sem3) || isNaN(sem4)) {
        alert("Please enter valid SGPA for each semester.");
        return;
    }

    let cgpa = (sem1 + sem2 + sem3+ sem4)/4;
    document.getElementById('cgpaResult').textContent = `CGPA: ${cgpa.toFixed(2)}`;
}
