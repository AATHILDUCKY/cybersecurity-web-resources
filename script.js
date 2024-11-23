const dataUrl = "data.json";
let resources = [];
let filteredResources = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => {
      resources = data;
      filteredResources = resources;
      renderContent();
    });

  const searchBar = document.getElementById("searchBar");

  // Filter content on search
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

    // Split input by commas for multiple keywords
    const keywords = query.split(",").map((word) => word.trim());

    filteredResources = resources.filter((item) =>
      keywords.every(
        (key) =>
          item.title.toLowerCase().includes(key) ||
          item.usage.toLowerCase().includes(key) ||
          item.keyword.toLowerCase().includes(key)
      )
    );

    renderContent();
  });
});

// Render Content
function renderContent() {
  const content = document.getElementById("content");
  content.innerHTML = ""; // Clear existing content

  if (filteredResources.length === 0) {
    content.innerHTML = `<p class="col-span-full text-center text-white text-xl">No results found.</p>`;
    return;
  }

  filteredResources.forEach((item) => {
    const container = document.createElement("a");
    container.href = item.link;
    container.target = "_blank";
    container.className =
      "card p-4 rounded shadow transition-transform duration-300 cursor-pointer";

    const title = document.createElement("h3");
    title.innerText = item.title;
    title.className = "text-lg font-bold mb-2";

    const usage = document.createElement("p");
    usage.innerText = item.usage;
    usage.className = "text-sm mb-1";

    const keyword = document.createElement("span");
    keyword.innerText = `Tag: ${item.keyword}`;
    keyword.className = "text-xs opacity-75";

    container.appendChild(title);
    container.appendChild(usage);
    container.appendChild(keyword);
    content.appendChild(container);
  });
}
