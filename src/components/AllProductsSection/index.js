import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiUrlStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  noProducts: 'NO_PRODUCTS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeStatus: apiUrlStates.initial,
    activeOptionId: sortbyOptions[0].optionId,
    titleInput: '',
    category: '',
    rating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      activeStatus: apiUrlStates.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, titleInput, category, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${titleInput}&category=${category}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      if (updatedData.length > 0) {
        this.setState({
          productsList: updatedData,
          activeStatus: apiUrlStates.success,
        })
      } else {
        this.setState({activeStatus: apiUrlStates.noProducts})
      }
    } else {
      this.setState({activeStatus: apiUrlStates.failure})
    }
  }

  updateCategory = categoryId => {
    this.setState({category: categoryId}, this.getProducts)
  }

  updateRating = ratingId => {
    this.setState({rating: ratingId}, this.getProducts)
  }

  updateInput = searchInput => {
    this.setState({titleInput: searchInput}, this.getProducts)
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  clearAllFilters = () => {
    this.setState({titleInput: '', rating: '', category: ''}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="failure-container">
      <div className="failure-sub-container">
        <img
          className="failure-image-style"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="products failure"
        />
        <h1 className="failure-name-style">Oops! Something Went Wrong</h1>
        <p className="failure-description-style">
          We are having some trouble processing your request. Please try again.
        </p>
      </div>
    </div>
  )

  renderNoProductsView = () => (
    <div className="no-products-container">
      <div className="no-products-sub-container">
        <img
          className="no-products-image-style"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
        />
        <h1 className="no-products-name-style">No Products Found</h1>
        <p className="no-products-description-style">
          We would not find any products. Try other filters.{' '}
        </p>
      </div>
    </div>
  )

  renderDifferentContainers = () => {
    const {activeStatus} = this.state
    switch (activeStatus) {
      case apiUrlStates.loading:
        return this.renderLoader()
      case apiUrlStates.success:
        return this.renderProductsList()
      case apiUrlStates.failure:
        return this.renderFailureView()
      case apiUrlStates.noProducts:
        return this.renderNoProductsView()
      default:
        return null
    }
  }

  render() {
    const {category, rating} = this.state
    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          updateCategory={this.updateCategory}
          updateRating={this.updateRating}
          updateInput={this.updateInput}
          clearAllFilters={this.clearAllFilters}
          category={category}
          rating={rating}
        />
        {this.renderDifferentContainers()}
        {/* {isLoading && this.renderLoader()}
        {isLoading === false &&
          (apiStatus === 'SUCCESS' ? (
            this.renderProductsList()
          ) : (
            <div className="failure-container">
              <div className="failure-sub-container">
                <img
                  className="failure-image-style"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
                  alt="products failure"
                />
                <h1 className="failure-name-style">
                  Oops! Something Went Wrong
                </h1>
                <p className="failure-description-style">
                  We are having some trouble processing your request. Please try
                  again.
                </p>
              </div>
            </div>
          ))} */}
      </div>
    )
  }
}

export default AllProductsSection
