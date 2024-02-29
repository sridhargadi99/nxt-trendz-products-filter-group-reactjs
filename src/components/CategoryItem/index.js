import './index.css'

const CategoryItem = props => {
  const {eachCategory, updateCategory, isActiveCategory} = props
  const {categoryId, name} = eachCategory
  const clickCategory = () => {
    updateCategory(categoryId)
  }
  return (
    <li
      className={`category-list-style ${
        isActiveCategory && 'category-list-style1'
      }`}
      onClick={clickCategory}
    >
      <p>{name}</p>
    </li>
  )
}

export default CategoryItem
