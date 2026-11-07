export function getSortedKeywords(articles) {
  const counts = {};

  articles.forEach(({ keyword }) => {
    if (!keyword) return;
    counts[keyword] = (counts[keyword] || 0) + 1;
  });

  return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
}
