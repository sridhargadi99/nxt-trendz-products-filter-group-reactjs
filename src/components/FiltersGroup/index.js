import {BiSearchAlt2} from 'react-icons/bi'

import CategoryItem from '../CategoryItem'
import './index.css'
import RatingItem from '../RatingItem'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    updateCategory,
    updateRating,
    updateInput,
    clearAllFilters,
    category,
    rating,
  } = props
  const inputValue = event => {
    if (event.key === 'Enter') {
      updateInput(event.target.value)
    }
  }

  const clickClearButton = () => {
    clearAllFilters()
  }

  return (
    <div className="filters-group-container">
      <div className="input-search-style">
        <input
          placeholder="search"
          className="filter-input-style"
          type="search"
          onKeyDown={inputValue}
        />
        <div className="filter-search-style">
          <BiSearchAlt2 className="sort-by-icon" />
        </div>
      </div>
      <div className="category-list-container">
        <h1 className="name-style">Category</h1>
        <ul className="list-container">
          {categoryOptions.map(eachCategory => (
            <CategoryItem
              eachCategory={eachCategory}
              key={eachCategory.categoryId}
              updateCategory={updateCategory}
              isActiveCategory={category === eachCategory.categoryId}
            />
          ))}
        </ul>
      </div>
      <div>
        <h1 className="name-style">Rating</h1>
        <ul className="list-container">
          {ratingsList.map(eachRating => (
            <RatingItem
              eachRating={eachRating}
              key={eachRating.ratingId}
              updateRating={updateRating}
              isActiveRating={rating === eachRating.ratingId}
            />
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="clear-button-style"
        onClick={clickClearButton}
      >
        clear filters
      </button>
    </div>
  )
}
export default FiltersGroup
