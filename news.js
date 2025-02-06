//2793ceca17b54186bba3fda471852b06
let currentQuery = "nutrition"; // Default search term

// Add search functionality
document.getElementById("search-btn").addEventListener("click", function () {
  const searchTerm = document.getElementById("search-input").value;
  currentQuery = searchTerm || "nutrition";
  fetchNews(); // Re-fetch news based on the search term
});

// Update the API URL to include the search term
async function fetchNews() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${currentQuery}&sortBy=publishedAt&apiKey=${apiKey}`
    );
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
  }
}