import React from 'react';
import './products_and_filters.css';
import order from '../../img/order.png';
import arrow from '../../img/arrow.png';
import { products } from '../../products.js';

const SelectedProduct = () => {

    return (
        <div className='products_and_filters'>
            <div className="header">
                <div className="products_and_filters_title">
                    <span>Products</span>
                </div>
                <div className="order">
                    <img src={order} alt="Order" />
                    <span>Sort by</span>
                    <select name="categories" id="categories_select">
                        <option value="price">Price</option>
                        <option value="price">Name</option>
                    </select>
                </div>
            </div>
            <div className="container_filters_photographs">
                <div className="filters">
                    <div className="categories">
                        <div className="title_filters">Category</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">People</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Premium</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Pets</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Food</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Landmarks</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Cities</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Nature</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="price_range">
                        <div className="title_filters">Price range</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="people" id="people" />
                                <label htmlFor="people">More than $200</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="photographs">
                    <div className="photographs_list">
                        {products.map((product) => {
                            return (
                                <div className="photography">
                                    <div className="image_and_button" style={{ backgroundImage: `url("${product.url}")` }}>
                                        <div className="add_cart_photography">ADD TO CART</div>
                                    </div>
                                    <div className="category">{product.category}</div>
                                    <div className="title">{product.title}</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="pages">
                        <img src={arrow} alt="ArrowLeft" />
                        <span>1 2 3 4</span>
                        <img src={arrow} alt="ArrowRight" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedProduct;