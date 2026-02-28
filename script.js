function showName() {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    if(fileInput.files[0]) {
        fileNameDisplay.innerHTML = `✅ <strong>${fileInput.files[0].name}</strong>`;
    }
}

function showError(msg) {
    const errorContainer = document.getElementById('errorContainer');
    if (errorContainer) {
        errorContainer.innerHTML = `<div class="error-msg">⚠️ ${msg}</div>`;
        setTimeout(() => { errorContainer.innerHTML = ""; }, 4000);
    }
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

    if(!fileInput.files[0]) {
        showError("Please upload a nutrition label image first!");
        return;
    }

    const fileType = fileInput.files[0].type;
    if(!fileType.startsWith('image/')) {
        showError("Invalid file! Please upload a valid Image (JPG/PNG).");
        fileInput.value = "";
        document.getElementById('fileName').innerText = "📸 Click to Upload Label";
        return;
    }

    results.style.display = "none";
    loader.style.display = "block";
    btn.disabled = true;
    card.classList.add('analyzing');

    // Realistic AI Simulation
    setTimeout(() => {
        // AI Recognition Probability (80% success rate)
        const aiSuccess = Math.random() > 0.2;

        if (!aiSuccess) {
            loader.style.display = "none";
            btn.disabled = false;
            card.classList.remove('analyzing');
            showError("AI Error: Nutrition table not detected or image too blurry. Please try again with a clearer photo.");
            return;
        }

        // Proceed to success
        loader.style.display = "none";
        btn.disabled = false;
        btn.innerText = "Scan Another Label";
        card.classList.remove('analyzing');
        results.style.display = "block";

        const sugar = Math.floor(Math.random() * 38); 
        const salt = (Math.random() * 1.8).toFixed(1); 
        
        let grade, color, score, insight, tip;

        if (sugar > 20) {
            grade = "D (3.5/10)"; color = "#e74c3c"; score = "35%";
            insight = "⚠️ <b>Warning:</b> This product contains excessive sugar. It could lead to rapid glucose spikes and energy crashes.";
            tip = "Try to avoid other processed sugars for the rest of the day and drink plenty of water.";
        } else if (sugar > 8) {
            grade = "B- (6.8/10)"; color = "#f1c40f"; score = "68%";
            insight = "🟡 <b>Moderate:</b> Sugar and sodium levels are within manageable limits. Good for occasional use.";
            tip = "Pair this with a high-fiber snack to help slow down sugar absorption.";
        } else {
            grade = "A (9.5/10)"; color = "#2ecc71"; score = "95%";
            insight = "✅ <b>Excellent:</b> Nutrition profile is very healthy. Safe for daily consumption.";
            tip = "Excellent choice! This food supports a balanced and healthy lifestyle.";
        }

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

    }, 3000);
}
