import { formatDate } from "../../utils/formatDate";

import "./NewsCard.css";

function NewsCard({
  article,
  isSavedPage,
  isLoggedIn,
  isSaved,
  onSave,
  onDelete,
}) {
  const { url, urlToImage, title, description, publishedAt, source, keyword } =
    article;

  const showSignInHint = !isSavedPage && !isLoggedIn;

  return (
    <article className="news-card">
      {urlToImage && (
        <img className="news-card__image" src={urlToImage} alt={title} />
      )}
      <div className="news-card__body">
        <time className="news-card__date" dateTime={publishedAt}>
          {formatDate(publishedAt)}
        </time>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source.name}</p>
      </div>

      {isSavedPage && <span className="news-card__keyword">{keyword}</span>}

      {isSavedPage ? (
        <>
          <button
            type="button"
            className="news-card__action news-card__action_type_delete"
            title="Remove from saved"
            onClick={() => onDelete(article)}
          />
          <span className="news-card__tooltip">Remove from saved</span>
        </>
      ) : (
        <>
          <button
            type="button"
            className={
              isSaved
                ? "news-card__action news-card__action_type_save news-card__action_marked"
                : "news-card__action news-card__action_type_save"
            }
            title={isSaved ? "Remove from saved" : "Save article"}
            onClick={() => onSave(article)}
          />
          {showSignInHint && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
        </>
      )}
    </article>
  );
}

export default NewsCard;
