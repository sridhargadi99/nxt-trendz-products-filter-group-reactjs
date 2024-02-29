import './index.css'

const RatingItem = props => {
  const {eachRating, updateRating, isActiveRating} = props
  const {ratingId, imageUrl} = eachRating
  const clickRating = () => {
    updateRating(ratingId)
  }
  return (
    <li className="rating-list-style">
      <button
        type="button"
        className="rating-button-style"
        onClick={clickRating}
      >
        <img
          className="rating-image-style"
          src={imageUrl}
          alt={`rating ${ratingId}`}
        />
        <p
          className={`rating-content-style ${
            isActiveRating && 'rating-content-style1'
          }`}
        >
          & up
        </p>
      </button>
    </li>
  )
}

export default RatingItem
