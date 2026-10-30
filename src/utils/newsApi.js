const newsApiBaseUrl = import.meta.env.PROD
  ? "https://news-api-proxy.up.railway.app/news/v2/everything"
  : "https://newsapi.org/v2/everything";

// Lives in .env.local as VITE_NEWS_API_KEY=your_key_here
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const toApiDate = (date) => date.toISOString().split("T")[0];

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export function searchArticles(keyword) {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const params = new URLSearchParams({
    q: keyword,
    apiKey,
    from: toApiDate(weekAgo),
    to: toApiDate(today),
    pageSize: 100,
  });

  return fetch(`${newsApiBaseUrl}?${params}`)
    .then(checkResponse)
    .then((data) =>
      data.articles.filter(
        (article) => article.title && article.title !== "[Removed]",
      ),
    );
}
