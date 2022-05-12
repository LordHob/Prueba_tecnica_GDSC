import React, { useEffect, useState } from 'react';
import './products_and_filters.css';
import order from '../../img/order.png';
import arrow from '../../img/arrow.png';
import { products } from '../../products.js';

const SelectedProduct = () => {

    /*HOOKS*/
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [filters, setFilters] = useState([]);
    const [productsPaginated, setProductsPaginated] = useState([]);
    const [indexPagination, setIndexPagination] = useState(0);
    const [maxPages, setMaxPages] = useState();
    const [activePage, setActivePage] = useState(1);
    const [pages, setPages] = useState([]);

    /*GUARDA FOTOS CON FILTRO SI EXISTE ALGUN FILTRO APLICADO, Y SI NO GUARDA TODAS*/
    useEffect(() => {
        if (filters.length !== 0) {
            setProductsFiltered(productsFiltered => []);
            filters.map((filter) =>{
                products.map((product) =>{
                    if (product.category === filter) {
                        setProductsFiltered(productsFiltered => [...productsFiltered, product]);
                    }
                })
            });
        } else {
            setProductsFiltered(products);
        }
    }, [filters]);

    /*MUESTRA 6 FOTOS POR PAGINA AL CAMBIAR DE FILTROS, Y MUESTRO LA CANTIDAD DE PAGINAS TOTALES*/
    useEffect(() => {
        setIndexPagination(0);
        if (productsFiltered.length > 0) {
            setProductsPaginated(productsPaginated => []);
            for (let i = indexPagination; i < 6; i++) {
                setProductsPaginated(productsPaginated => [...productsPaginated, productsFiltered[i]]);
            }
        }
        setMaxPages(productsFiltered.length / 6);
        setPages(pages => []);
        for (let i = 1; i <= productsFiltered.length / 6; i++) {
            setPages(pages => [...pages, <span id={i} className={activePage === i ? 'disabled' : ""}>{i}</span>]);
        }
    }, [productsFiltered]);

    /*CAMBIA LAS FOTOS QUE MUESTRA POR PAGINA*/
    useEffect(() => {
        if (productsFiltered.length > 0) {
            setProductsPaginated(productsPaginated => []);
            for (let i = indexPagination; i < indexPagination + 6; i++) {
                setProductsPaginated(productsPaginated => [...productsPaginated, productsFiltered[i]]);
            }
        }
    }, [indexPagination]);

    /*CAMBIA LAS FOTOS QUE MUESTRA POR PAGINA*/
    useEffect(() => {
        for (let i = 1; i <= maxPages; i++) {
            if (document.getElementById(i)) {
                document.getElementById(i).classList.remove('disabled');
            }
        }
        if (document.getElementById(activePage)) {
            document.getElementById(activePage).classList.add('disabled');
        }
    }, [activePage]);

    /*AÑADE O QUITA FILTROS*/
    const addFilterCategory = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter(key => key !== filter));
            return;
        } else {
            setFilters([...filters, filter]);
            return;
        }
    }

    const addFilterPrice = (lowPrice, highPrice) => {

    }

    const nextPage = () => {
        setIndexPagination(indexPagination + 6);
        setActivePage(activePage + 1);
    }

    const previousPage = () => {
        setIndexPagination(indexPagination - 6);
        setActivePage(activePage - 1);
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
                                <input type="checkbox" name="Men's clothing" id="Men's clothing" onChange={() => addFilterCategory("Men's clothing")} />
                                <label htmlFor="Men's clothing">Men's clothing</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Women's clothing" id="Women's clothing" onChange={() => addFilterCategory("Women's clothing")}/>
                                <label htmlFor="Women's clothing">Women's clothing</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="Jewelery" id="Jewelery" onChange={() => addFilterCategory("Jewelery")} />
                                <label htmlFor="Jewelery">Jewelery</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="electronics" id="electronics" onChange={() => addFilterCategory("electronics")} />
                                <label htmlFor="electronics">Electronics</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="price_range">
                        <div className="title_filters">Price range</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" name="lower_than_20" id="lower_than_20" onChange={() => addFilterPrice(0, 19)}/>
                                <label htmlFor="lower_than_20">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="20_100" id="20_100" onChange={() => addFilterPrice(20, 99)}/>
                                <label htmlFor="20_100">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="100_200" id="100_200" onChange={() => addFilterPrice(100, 200)}/>
                                <label htmlFor="100_200">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" name="more_than_200" id="more_than_200" onChange={() => addFilterPrice(201, 10000)}/>
                                <label htmlFor="more_than_200">More than $200</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="photographs">
                    <div className="photographs_list">
                        {productsPaginated.map((product) => {
                            return (
                                <div className="photography" key={product?.id}>
                                    <div className="image_and_button" style={{backgroundImage: `url("${product?.url}")`}}>
                                        <div className="add_cart_photography">ADD TO CART</div>
                                    </div>
                                    <div className="category">{product?.category}</div>
                                    <div className="title">{product?.title}</div>
                                    <div className="price">${product?.price}</div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="pages">
                        <img src={arrow} alt="ArrowLeft" onClick={() => previousPage()} className={indexPagination <= 0 ? 'disabled' : ""} />
                        {pages.map((page) => {
                            return (
                                page
                            )
                        })}
                        <img src={arrow} alt="ArrowRight" onClick={() => nextPage()} className={activePage === maxPages ? 'disabled' : ""} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedProduct;