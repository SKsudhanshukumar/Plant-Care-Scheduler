const plantForm = document.getElementById("plantForm");
const plantList = document.getElementById("plantList");
const toastContainer = document.getElementById("toastContainer");
const emptyState = document.getElementById("emptyState");

plantForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("plantName").value.trim();
  const water = document.getElementById("waterSchedule").value.trim();
  const prune = document.getElementById("pruneSchedule").value.trim();
  const fertilize = document.getElementById("fertilizeSchedule").value.trim();

  if (!name || !water) {
    showToast("Please enter both the plant name and watering schedule.", "error");
    return;
  }

  emptyState.style.display = "none";

  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded-xl shadow border-l-4 border-green-500 animate-slideIn";

  card.innerHTML = `
    <h3 class="text-lg font-bold text-green-700 mb-2">${name}</h3>
    <ul class="text-sm space-y-1">
      <li><strong>💧 Water:</strong> ${water}</li>
      ${prune ? `<li><strong>✂️ Prune:</strong> ${prune}</li>` : ""}
      ${fertilize ? `<li><strong>🌾 Fertilize:</strong> ${fertilize}</li>` : ""}
    </ul>
    <button class="delete-btn mt-4 text-sm text-red-600 hover:underline">Remove</button>
  `;

  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.classList.add("animate-fadeOut");
    setTimeout(() => {
      card.remove();
      if (plantList.children.length === 0) emptyState.style.display = "block";
    }, 400);
    showToast(`${name} removed from the schedule.`, "info");
  });

  plantList.appendChild(card);
  showToast(`${name} added successfully!`, "success");

  plantForm.reset();
});

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  const color = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600"
  }[type] || "bg-gray-800";

  toast.className = `${color} text-white px-4 py-2 rounded shadow animate-slideIn`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("animate-fadeOut");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
