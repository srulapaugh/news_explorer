import NewsCard from "../NewsCard/NewsCard";

import "./NewsCardList.css";

function NewsCardList({
  articles,
  savedArticles = [],
  isSavedPage = false,
  isLoggedIn,
  onSaveArticle,
  onDeleteArticle,
}) {
  return (
    <ul className="news-card-list">
      {articles.map((article) => (
        <li className="news-card-list__item" key={article.url}>
          <NewsCard
            article={article}
            isSavedPage={isSavedPage}
            isLoggedIn={isLoggedIn}
            isSaved={savedArticles.some((saved) => saved.url === article.url)}
            onSave={onSaveArticle}
            onDelete={onDeleteArticle}
          />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;
