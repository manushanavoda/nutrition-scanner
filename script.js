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
    const tipsBox = document.getElementById('healthTips');
    const tipText = document.getElementById('tipText');

    if(btn.innerText === "Scan Another Label") {
        location.reload(); // සරලව ඇප් එක reset කිරීම
        return;
    }

    if(!fileInput.files[0]) {
        alert("Please upload a nutrition label first!");
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

        const sugar = 24; 
        const gradeText = document.getElementById('gradeText');

        // AI Insight Logic
        const insightContainer = document.getElementById('aiInsightBox');
        insightContainer.innerHTML = `
            <div class="ai-insight">
                <strong>🤖 AI Health Insight:</strong><br>
                ⚠️ <strong>High sugar detected.</strong> This exceeds the daily limit. 
                Frequent consumption may lead to insulin resistance and low energy.
            </div>
        `;

        // Health Tips & Grade Styling
        if (sugar > 20) {
            gradeText.style.color = "#e74c3c"; // Red for B- or lower
            tipText.innerHTML = "Since this is high in sugar, try to drink 2 extra glasses of water today and avoid other sugary snacks for the next 24 hours.";
        } else {
            gradeText.style.color = "#2ecc71"; // Green for better grades
            tipText.innerHTML = "Great choice! This fits well into a healthy lifestyle. Pair it with high-fiber food for best results.";
        }
        tipsBox.style.display = "block";

        setTimeout(() => {
            document.getElementById('fill').style.width = "65%";
        }, 100);

    }, 2500);
}