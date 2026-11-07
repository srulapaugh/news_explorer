import NewsCardList from "../NewsCardList/NewsCardList";
import { getSortedKeywords } from "../../utils/getSortedKeywords";

import "./SavedNews.css";

function SavedNews({ currentUser, savedArticles, onDeleteArticle }) {
  const count = savedArticles.length;
  const keywords = getSortedKeywords(savedArticles);

  const renderKeywords = () => {
    if (keywords.length === 0) return null;

    if (keywords.length > 3) {
      return (
        <>
          <strong>
            {keywords[0]}, {keywords[1]},
          </strong>{" "}
          and {keywords.length - 2} other
        </>
      );
    }

    if (keywords.length === 3) {
      return (
        <>
          <strong>
            {keywords[0]}, {keywords[1]},
          </strong>{" "}
          and <strong>{keywords[2]}</strong>
        </>
      );
    }

    if (keywords.length === 2) {
      return (
        <>
          <strong>{keywords[0]}</strong> and <strong>{keywords[1]}</strong>
        </>
      );
    }

    return <strong>{keywords[0]}</strong>;
  };

  return (
    <main className="saved-news">
      <section className="saved-news__intro">
        <p className="saved-news__label">Saved articles</p>
        <h1 className="saved-news__title">
          {currentUser.name}, you have {count === 0 ? "no" : count} saved{" "}
          {count === 1 ? "article" : "articles"}
        </h1>
        {keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords: {renderKeywords()}
          </p>
        )}
      </section>

      {count > 0 && (
        <section className="saved-news__articles">
          <NewsCardList
            articles={savedArticles}
            savedArticles={savedArticles}
            isSavedPage={true}
            isLoggedIn={true}
            onDeleteArticle={onDeleteArticle}
          />
        </section>
      )}
    </main>
  );
}

export default SavedNews;
