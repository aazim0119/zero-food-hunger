const apiKey = 'd2774b92efa846a98f5ae23bb50c3161';
let currentQuery = "nutrition"; // Default search term

// Add search functionality
document.getElementById("search-btn").addEventListener("click", function () {
  const searchTerm = document.getElementById("search-input").value;
  currentQuery = searchTerm || "nutrition";
  fetchNews(); // Re-fetch news based on the search term
});

// Function to fetch news articles
async function fetchNews() {
  const newsContainer = document.getElementById("news-articles");
  newsContainer.innerHTML = "<p>Loading...</p>"; // Show loading message

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

// Function to display news articles
function displayNews(articles) {
  const newsContainer = document.getElementById("news-articles");
  newsContainer.innerHTML = ""; // Clear previous articles

  if (articles.length === 0) {
    newsContainer.innerHTML = "<p>No articles found.</p>";
    return;
  }

  articles.forEach(article => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("news-article");

    articleElement.innerHTML = `
      <img src="${article.urlToImage}" alt="Article Image">
      <div class="news-content">
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p class="news-source">Source: ${article.source.name}</p>
        <p>${article.description}</p>
      </div>
    `;

    newsContainer.appendChild(articleElement);
  });
}

// Initial fetch on page load
fetchNews();
