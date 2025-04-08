document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("targetDate").value = today;
  });
  
  function calculateAge() {
    const dob = new Date(document.getElementById("dob").value);
    const target = new Date(document.getElementById("targetDate").value);
  
    if (!dob || !target || dob >= target) {
      alert("Please enter valid dates.");
      return;
    }
  
    let years = target.getFullYear() - dob.getFullYear();
    let months = target.getMonth() - dob.getMonth();
    let days = target.getDate() - dob.getDate();
  
    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    const ageInMs = target - dob;
    const totalDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const hours = totalDays * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const totalMonths = years * 12 + months;
  
    const summary = `
      <strong>Age:</strong><br>
      ${years} years ${months} months ${days} days<br>
      or ${totalMonths} months ${days} days<br>
      or ${weeks} weeks ${totalDays % 7} days<br>
      or ${totalDays.toLocaleString()} days<br>
      or ${hours.toLocaleString()} hours<br>
      or ${minutes.toLocaleString()} minutes<br>
      or ${seconds.toLocaleString()} seconds
    `;
  
    document.getElementById("resultBox").innerHTML = summary;
  }
  
  function resetFields() {
    document.getElementById("dob").value = "";
    document.getElementById("targetDate").value = new Date().toISOString().split("T")[0];
    document.getElementById("resultBox").innerHTML = "";
  }
  
  function downloadSummary() {
    const result = document.getElementById("resultBox").innerText;
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "age_summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  