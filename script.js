function showName() {
    const file = document.getElementById('fileInput').files[0];
    if(file) {
        document.getElementById('fileName').innerHTML = `✅ <strong>${file.name}</strong>`;
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
        alert("Please upload a label image first!");
        return;
    }

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

        // --- DYNAMIC LOGIC START ---
        const sugar = Math.floor(Math.random() * 35); // Random 0-35g
        const salt = (Math.random() * 1.5).toFixed(1); // Random 0.0-1.5g
        
        let grade, color, score, insight, tip;

        if (sugar > 20) {
            grade = "D (3.2/10)"; color = "#e74c3c"; score = "32%";
            insight = "⚠️ <b>Warning:</b> This product is extremely high in sugar. Consuming this frequently may lead to health risks like insulin resistance.";
            tip = "Try to drink 2 extra glasses of water to help process the high sugar intake today.";
        } else if (sugar > 8) {
            grade = "B- (6.5/10)"; color = "#f1c40f"; score = "65%";
            insight = "🟡 <b>Moderate:</b> Sugar content is average. It's okay for an occasional treat, but not for every meal.";
            tip = "Balance this with a high-fiber meal later in the day to stabilize your energy levels.";
        } else {
            grade = "A (9.2/10)"; color = "#2ecc71"; score = "92%";
            insight = "✅ <b>Excellent:</b> This product has a very healthy profile. It is safe for daily consumption.";
            tip = "This is a great choice! Keep picking products with similar low-sugar profiles.";
        }

        // Update UI
        const gradeDisplay = document.getElementById('gradeText');
        gradeDisplay.innerText = grade;
        gradeDisplay.style.color = color;
        document.getElementById('fill').style.width = score;

        // Update Nutrition Items
        const sCard = document.getElementById('sugarCard');
        sCard.className = `nutrition-item ${sugar > 15 ? 'high' : (sugar > 7 ? 'med' : 'low')}`;
        document.getElementById('sugarVal').innerText = `${sugar}g`;

        const slCard = document.getElementById('saltCard');
        slCard.className = `nutrition-item ${salt > 0.8 ? 'high' : 'low'}`;
        document.getElementById('saltVal').innerText = `${salt}g`;

        document.getElementById('aiInsightBox').innerHTML = `<div class="ai-insight"><strong>🤖 AI Insight:</strong><br>${insight}</div>`;
        document.getElementById('tipText').innerText = tip;
        document.getElementById('healthTips').style.display = "block";
        // --- DYNAMIC LOGIC END ---

    }, 2500);
}
