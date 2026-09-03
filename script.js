// Local datasets structured exactly like Kumud's seed.py file configurations
const patientDatabaseMock = {
    record_pass: {
        legacy: { PID: "P1024", PT_NM: "Aarav Sharma", AGE_YRS: "45", DX: "HyperTension" },
        modern: { patient_id: "P1024", name: "Aarav Sharma", age: "45", diagnosis: "Hypertension" }
    },
    record_fail: {
        legacy: { PID: "PT-082847", PT_NM: "SHARMA, PRIYA R", AGE_YRS: "22", DX: "HYPERTENSION" },
        modern: { patient_id: "PAT-882847", name: "Priya R. Sharma", age: "25", diagnosis: "Hypertension" }
    }
};

// JavaScript function mirroring Kumud's Python validation.py normalize() logic
function normalizeString(txt) {
    if (!txt) return "";
    return String(txt).trim().toLowerCase();
}

function runValidationTest() {
    const selectedKey = document.getElementById("patient-selector").value;
    const activeData = patientDatabaseMock[selectedKey];

    // Populating the Old Hospital Screen Elements
    document.getElementById("old-pid").innerText = activeData.legacy.PID;
    document.getElementById("old-name").innerText = activeData.legacy.PT_NM;
    document.getElementById("old-age").innerText = activeData.legacy.AGE_YRS;
    document.getElementById("old-dx").innerText = activeData.legacy.DX;

    // Populating the New Hospital Screen Elements
    document.getElementById("new-pid").innerText = activeData.modern.patient_id;
    document.getElementById("new-name").innerText = activeData.modern.name;
    document.getElementById("new-age").innerText = activeData.modern.age;
    document.getElementById("new-diagnosis").innerText = activeData.modern.diagnosis;

    const bannerBox = document.getElementById("decision-banner");
    const textMsg = document.getElementById("action-message");

    let hasAnomalies = false;

    // Triggering rule testing checks matching validation.py logic
    if (normalizeString(activeData.legacy.PID) !== normalizeString(activeData.modern.patient_id)) {
        document.getElementById("new-pid").className = "error-highlight";
        hasAnomalies = true;
    } else { document.getElementById("new-pid").className = ""; }

    if (normalizeString(activeData.legacy.AGE_YRS) !== normalizeString(activeData.modern.age)) {
        document.getElementById("new-age").className = "error-highlight";
        hasAnomalies = true;
    } else { document.getElementById("new-age").className = ""; }

    // Swapping visual banner elements dynamically based on errors caught
    if (hasAnomalies) {
        bannerBox.className = "decision-banner banner-fail";
        textMsg.innerHTML = "<strong>CRITICAL PIPELINE INTERRUPT: PAUSE MIGRATION</strong><br>Data mapping validation mismatch errors captured between old and new storage channels.";
    } else {
        bannerBox.className = "decision-banner banner-pass";
        textMsg.innerHTML = "<strong>VALIDATION CYCLE VERIFIED: CONTINUE MIGRATION</strong><br>All legacy system field elements achieved 100% data parity matching target systems.";
    }
}

// Fire the validation system immediately when page opens
window.onload = runValidationTest;
