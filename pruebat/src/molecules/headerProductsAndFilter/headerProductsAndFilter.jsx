import React from 'react';
import './headerProductsAndFilter.css';
import order from '../../img/order.png';
import filter from '../../img/filter.png';
import arrow from '../../img/arrow.png';

const HeaderProductsAndFilter = (props) =>{

    return(
        <div className="header">
            <div className="products_and_filters_title">
                <span>Photography</span>
            </div>
            {document.documentElement.scrollWidth > 768
            ?
            <div className="order">
                <img src={order} alt="Order" onClick={() => props.orderProducts()}/>
                <span>Sort by</span>
                <select name="categories" id="categories_select" onChange={() => props.configOrderKey()}>
                    <option value="price" selected>Price</option>
                    <option value="title">Title</option>
                </select>
                <img src={arrow} alt="Select" />
            </div>
            :
            <div className="button_filters">
                <img src={filter} alt="Filter" onClick={() => props.seeFilters()}/>
            </div>
            }
        </div>
    )
}

export default HeaderProductsAndFilter;