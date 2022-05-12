import React, { useEffect, useState } from 'react';
import './products_and_filters.css';
import order from '../../img/order.png';
import arrow from '../../img/arrow.png';
import { products } from '../../products.js';

const SelectedProduct = () => {

    const [productsFiltered, setProductsFiltered] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        if (filters.length !== 0) {
            setProductsFiltered(productsFiltered => []);
            filters.map((filter)=>{
                products.map((product)=>{
                    if (product.category === filter) {
                        setProductsFiltered(productsFiltered => [...productsFiltered, product]);
                    }
                })
            });
        } else {
            setProductsFiltered(products);
        }
    }, [filters])

    const addFilter = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter(key => key !== filter));
            return;
        } else {
            setFilters([...filters, filter]);
            return;
        }
    }

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
                                <input type="checkbox" name="Men's clothing" id="Men's clothing" onChange={() => addFilter("Men's clothing")} />
                                <label htmlFor="Men's clothing">Men's clothing</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Women's clothing" id="Women's clothing" onChange={() => addFilter("Women's clothing")}/>
                                <label htmlFor="Women's clothing">Women's clothing</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Jewelery" id="Jewelery" onChange={() => addFilter("Jewelery")} />
                                <label htmlFor="Jewelery">Jewelery</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="electronics" id="electronics" onChange={() => addFilter("electronics")} />
                                <label htmlFor="electronics">Electronics</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="price_range">
                        <div className="title_filters">Price range</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" name="lower_than_20" id="lower_than_20" />
                                <label htmlFor="lower_than_20">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="20_100" id="20_100" />
                                <label htmlFor="20_100">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="100_200" id="100_200" />
                                <label htmlFor="100_200">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="more_than_200" id="more_than_200" />
                                <label htmlFor="more_than_200">More than $200</label>
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