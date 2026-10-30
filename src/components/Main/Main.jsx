import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import About from "../About/About";
import "./Main.css";
import "../../vendor/fonts.css";

const CARDS_PER_PAGE = 3;

function Main({
  articles,
  isLoading,
  hasSearched,
  savedArticles,
  isLoggedIn,
  onSearch,
  onSaveArticle,
}) {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  const handleSearch = (keyword) => {
    setVisibleCount(CARDS_PER_PAGE);
    onSearch(keyword);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  };

  const hasResults = articles.length > 0;
  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <main className="main">
      <section className="main__intro">
        <div className="main__intro-content">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>

          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {hasSearched && (
        <section className="main__results">
          {isLoading && <Preloader />}

          {!isLoading && !hasResults && (
            <div className="main__status">
              <h2 className="main__status-title">Nothing found</h2>
              <p className="main__status-text">
                Sorry, but nothing matched your search terms.
              </p>
            </div>
          )}

          {!isLoading && hasResults && (
            <>
              <h2 className="main__results-title">Search results</h2>
              <NewsCardList
                articles={visibleArticles}
                savedArticles={savedArticles}
                isLoggedIn={isLoggedIn}
                onSaveArticle={onSaveArticle}
              />
              {visibleCount < articles.length && (
                <button
                  type="button"
                  className="main__show-more"
                  onClick={handleShowMore}
                >
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      )}

      <About />
    </main>
  );
}

export default Main;
