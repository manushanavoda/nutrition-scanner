function showError(msg) {
    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
        errorContainer.innerHTML = `<div class="error-msg">⚠️ ${msg}</div>`;
        setTimeout(() => { errorContainer.innerHTML = ""; }, 3500);
    } else {
        alert(msg); // Error box එක නැත්නම් alert එකක් හරි පෙන්වන්න
    }
}
function showName() {
    const file = document.getElementById('fileInput').files[0];
    const fileNameDisplay = document.getElementById('fileName');
    if(file) {
        fileNameDisplay.innerHTML = `✅ <strong>${file.name}</strong>`;
    }
}

// ⚠️ Error එක පෙන්වන function එක
function showError(msg) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `<div class="error-msg">⚠️ ${msg}</div>`;
    
    // තත්පර 3 කින් error එක අයින් කරනවා
    setTimeout(() => {
        errorContainer.innerHTML = "";
    }, 3500);
}

function startAnalysis() {
    const fileInput = document.getElementById('fileInput');
    const btn = document.getElementById('scanBtn');
    const loader = document.getElementById('loaderBox');
    const results = document.getElementById('results');
    const card = document.getElementById('mainCard');

    if(btn.innerText === "Scan Another Label") {
        location.reload();
        return;
    }

    // 1. කිසිම file එකක් තෝරා නැතිනම්
    if(!fileInput.files[0]) {
        showError("Please upload an image first!");
        return;
    }

    // 2. Image එකක් නොවන file එකක් නම් (Validation)
    const fileType = fileInput.files[0].type;
    if(!fileType.startsWith('image/')) {
        showError("Invalid file! Please upload a JPG or PNG image.");
        fileInput.value = ""; // Reset input
        document.getElementById('fileName').innerText = "📸 Click to Upload Label";
        return;
    }

    // Analysis start UI
    results.style.display = "none";
    loader.style.display = "block";
    btn.disabled = true;
    card.classList.add('analyzing');

    setTimeout(() => {
        loader.style.display = "none";
        btn.disabled = false;
        btn.innerText = "Scan Another Label";
        card.classList.remove('analyzing');
        results.style.display = "block";

        // --- DYNAMIC RESULTS LOGIC ---
        const sugar = Math.floor(Math.random() * 38); 
        const salt = (Math.random() * 1.8).toFixed(1); 
        
        let grade, color, score, insight, tip;

        if (sugar > 20) {
            grade = "D (3.5/10)"; color = "#e74c3c"; score = "35%";
            insight = "⚠️ <b>Warning:</b> This product is extremely high in sugar. Frequent intake can lead to energy crashes and insulin spikes.";
            tip = "Avoid other sugary snacks today and try to drink at least 2L of water to stay hydrated.";
        } else if (sugar > 8) {
            grade = "B- (6.8/10)"; color = "#f1c40f"; score = "68%";
            insight = "🟡 <b>Moderate:</b> Sugar and sodium levels are average. Suitable for occasional consumption.";
            tip = "Balance this with fiber-rich food like vegetables to stabilize your blood sugar levels.";
        } else {
            grade = "A (9.5/10)"; color = "#2ecc71"; score = "95%";
            insight = "✅ <b>Excellent:</b> This product is low in sugar and salt. It is safe for your daily diet.";
            tip = "This is a great choice! Continue selecting products with similar nutritional profiles.";
        }

        // Update UI Elements
        const gradeDisplay = document.getElementById('gradeText');
        gradeDisplay.innerText = grade;
        gradeDisplay.style.color = color;
        document.getElementById('fill').style.width = score;

        const sCard = document.getElementById('sugarCard');
        sCard.className = `nutrition-item ${sugar > 18 ? 'high' : (sugar > 8 ? 'med' : 'low')}`;
        document.getElementById('sugarVal').innerText = `${sugar}g`;

        const slCard = document.getElementById('saltCard');
        slCard.className = `nutrition-item ${salt > 1.0 ? 'high' : 'low'}`;
        document.getElementById('saltVal').innerText = `${salt}g`;

        document.getElementById('aiInsightBox').innerHTML = `<div class="ai-insight"><strong>🤖 AI Insight:</strong><br>${insight}</div>`;
        document.getElementById('tipText').innerText = tip;
        document.getElementById('healthTips').style.display = "block";

    }, 2800); // 2.8s Delay for realistic feel
}

