import React, { useEffect, useState } from 'react';
import './products_and_filters.css';
import order from '../../img/order.png';
import arrow from '../../img/arrow.png';
import filter from '../../img/filter.png';
import { products } from '../../products.js';
import CheckboxItem from '../../atoms/checkboxItem/checkboxItem';

const SelectedProduct = (props) => {

    /*HOOKS*/
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [filters, setFilters] = useState([]);
    const [productsPaginated, setProductsPaginated] = useState([]);
    const [indexPagination, setIndexPagination] = useState(0);
    const [maxPages, setMaxPages] = useState();
    const [activePage, setActivePage] = useState(1);
    const [pages, setPages] = useState([]);
    const [orderKey, setOrderKey] = useState("Price");
    const [orderWay, setOrderWay] = useState("ASC");
    const [showFiltersMovil, setShowFiltersMovil] = useState(false);
    const [productsPerPage, setProductsPerPage] = useState(6);

    /*DETERMINA LA CANTIDAD DE FOTOS QUE SE VEN POR PÁGINA (6 EN VERSIÓN NORMAL Y 4 EN VERSIÓN MOVIL*/
    useEffect(() => {
        if (document.documentElement.scrollWidth > 768) {
            setProductsPerPage(6);
        } else {
            setProductsPerPage(4);
        }
    })

    /*
    GUARDA FOTOS CON FILTRO SI EXISTE ALGUN FILTRO APLICADO, Y SI NO GUARDA TODAS.
    GUARDA LAS FOTOS FILTRADAS POR PRECIO EN SU PROPIO ARRAY.
    GUARDA LAS FOTOS FILTRADAS POR CATEGORIAS EN SU PROPIO ARRAY.
    SI HAY 2 TIPOS DE FILTRO APLICADOS, MUESTRA LAS COINCIDENCIAS DE AMBOS ARRAYS.
    */

    useEffect(() => {
        setActivePage(1);
        if (filters.length !== 0) {
            setProductsFiltered(productsFiltered => []);
            let productsCategories = [];
            let productsPrizes = [];
            filters.map((filter) =>{
                if (filter === "0-19" || filter === "20-99" || filter === "100-200" || filter === "201") {
                    switch (filter) {
                        case "0-19":
                            products.map((product) => {
                                if (product.price < 20) {
                                    productsPrizes.push(product);
                                }
                            })
                            break;
                        case "20-99":
                            products.map((product) => {
                                if (product.price >= 20 & product.price <= 100) {
                                    productsPrizes.push(product);
                                }
                            })
                            break;
                        case "100-200":
                            products.map((product) => {
                                if (product.price > 100 & product.price < 201) {
                                    productsPrizes.push(product);
                                }
                            })
                            break;
                        case "201":
                            products.map((product) => {
                                if (product.price >= 201) {
                                    productsPrizes.push(product);
                                }
                            })
                            break;

                        default:
                            break;
                    }
                } else {
                    products.map((product) => {
                        if (product.category === filter) {
                            productsCategories.push(product);
                        }
                    })
                }
            });
            if (productsCategories.length > 0 & productsPrizes.length > 0) {
                productsCategories.map((productCategory) => {
                    productsPrizes.map((productPrice) => {
                        if (productCategory.id === productPrice.id) {
                            setProductsFiltered(productsFiltered => [...productsFiltered, productPrice]);
                        }
                    })
                })
            }
            if (productsCategories.length > 0 & productsPrizes.length === 0) {
                setProductsFiltered(productsCategories);
            }
            if (productsCategories.length === 0 & productsPrizes.length > 0) {
                setProductsFiltered(productsPrizes);
            }
        } else {
            setProductsFiltered(products);
        }
    }, [filters]);

    /*MUESTRA HASTA 6 FOTOS POR PAGINA (4 EN VERSIÓN MOVIL) AL CAMBIAR DE FILTROS, Y MUESTRO LA CANTIDAD DE PAGINAS TOTALES*/
    useEffect(() => {
        setIndexPagination(0);
        if (productsFiltered.length > 0) {
            setProductsPaginated(productsPaginated => []);
            for (let i = indexPagination; i < productsPerPage; i++) {
                if (productsFiltered[i]?.id) {
                    setProductsPaginated(productsPaginated => [...productsPaginated, productsFiltered[i]]);
                }
        }
    }
        let maxPage = Math.ceil(productsFiltered.length / productsPerPage);
        setMaxPages(Math.ceil(productsFiltered.length / productsPerPage));
        setPages(pages => []);
        for (let i = 1; i <= productsFiltered.length / 6; i++) {
            setPages(pages => [...pages, <span id={i} className={activePage === i ? 'disabled' : ""}>{i}</span>]);
        }
    }, [productsFiltered]);

    /*CAMBIA LAS FOTOS QUE MUESTRA POR PAGINA*/
    useEffect(() => {
        if (productsFiltered.length > 0) {
            setProductsPaginated(productsPaginated => []);
            for (let i = indexPagination; i < indexPagination + productsPerPage; i++) {
                if (productsFiltered[i]?.id) {
                    setProductsPaginated(productsPaginated => [...productsPaginated, productsFiltered[i]]);
                }
            }
        }
    }, [indexPagination]);

    /*CAMBIA LAS FOTOS QUE MUESTRA POR PAGINA*/
    useEffect(() => {
        for (let i = 1; i <= maxPages; i++) {
            if (document.getElementById(i)) {
                document.getElementById(i).classList.remove('active');
            }
        }
        if (document.getElementById(activePage)) {
            document.getElementById(activePage).classList.add('active');
        }
    }, [activePage]);

    /*CONFIGURA QUE CRITERIO SIGUE PARA ORDENAR LAS FOTOS*/
    const configOrderKey = () => {
        setOrderKey(document.getElementById("categories_select").selectedOptions[0].innerHTML);
    }

    /*ORDENA RESULTADOS*/
    const orderProducts = () => {
        let ordenedProducts = []
        productsFiltered.map((product) => {
            ordenedProducts.push(product);
        })
        console.log(orderKey);
        if (orderKey === "Price") {
            console.log(orderWay);
            if (orderWay === "ASC") {
                ordenedProducts.sort(function (a, b) {
                    if (a.price > b.price) {
                        return 1;
                    }
                    if (a.price < b.price) {
                        return -1;
                    }
                    return 0;
                })
                console.log(ordenedProducts);
                setOrderWay("DESC");
                setProductsFiltered(ordenedProducts);
                return;
            } else {
                ordenedProducts.sort(function (a, b) {
                    if (a.price > b.price) {
                        return -1;
                    }
                    if (a.price < b.price) {
                        return 1;
                    }
                    return 0;
                })
                setOrderWay("ASC");
                setProductsFiltered(ordenedProducts);
                return;
            }
        } else {
            if (orderWay === "ASC") {
                ordenedProducts.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1;
                    }
                    return 0;
                })
                setOrderWay("DESC");
                setProductsFiltered(ordenedProducts);
                return;
            } else {
                ordenedProducts.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (a.title < b.title) {
                        return 1;
                    }
                    return 0;
                })
                setOrderWay("ASC");
                setProductsFiltered(ordenedProducts);
                return;
            }
        }
    }

    /*AÑADE O QUITA FILTROS*/
    const addFilter = (filter) => {
        if (filters.includes(filter)) {
            setFilters(filters.filter(key => key !== filter));
            return;
        } else {
            setFilters([...filters, filter]);
            return;
        }
    }

    /*MOVIMIENTO ENTRE PÁGINAS*/
    const nextPage = () => {
        setIndexPagination(indexPagination + productsPerPage);
        setActivePage(activePage + 1);
    }

    const previousPage = () => {
        setIndexPagination(indexPagination - productsPerPage);
        setActivePage(activePage - 1);
    }

    /*CONTROLA VISUALIZACIÓN DE PANTALLA DE FILTROS EN MOVIL*/
    const seeFilters = () => {
        document.getElementById("filters").style.display = "inline-block";
        setShowFiltersMovil(true)
    }

    const closeFilters = () => {
        document.getElementById("filters").style.display = "none";
        setShowFiltersMovil(false)
    }

    const closeAndClearFilters = () => {
        let checkboxes = document.getElementsByClassName("input_checkbox");
        console.log(checkboxes);
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }
        document.getElementById("filters").style.display = "none";
        setShowFiltersMovil(false)
        setFilters([]);
    }

    return (
        <div className='products_and_filters'>
            <div className="header">
                <div className="products_and_filters_title">
                    <span>Products</span>
                </div>
                {document.documentElement.scrollWidth > 768
                    ?
                <div className="order" onClick={() => orderProducts()}>
                    <img src={order} alt="Order" />
                    <span>Sort by</span>
                    <select name="categories" id="categories_select" onChange={() => configOrderKey()}>
                        <option value="price" selected>Price</option>
                        <option value="title">Title</option>
                    </select>
                    <img src={arrow} alt="Select" />
                </div>
                :
                <div className="button_filters">
                    <img src={filter} alt="Filter" onClick={() => seeFilters()} />
                </div>
                }
            </div>
            <div className="container_filters_photographs">
                <div className="filters" id="filters">
                    {showFiltersMovil
                        ?
                        <div className="header_movil">
                            <div className="products_and_filters_title_movil">
                                <span>Products</span>
                            </div>
                            <div className="button_filters">
                                <img src={filter} alt="Filter" onClick={() => seeFilters()} />
                            </div>
                        </div>
                        :
                        null
                    }
                    <div className="categories">
                        <div className="title_filters">Category</div>
                        {showFiltersMovil
                            ?
                            <div className='close_movil_filters' onClick={() => closeFilters()}>X</div>
                            :
                            null
                        }
                        <div className="checkbox_list">
                            {/* {filtersCategory.map((filter) => {
                                return (
                                    <CheckboxItem
                                        filter={filter}
                                        addFilter={addFilter}
                                    />
                                )
                            })} */}
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="Men's clothing" id="Men's clothing" onChange={() => addFilter("Men's clothing")} />
                                <label htmlFor="Men's clothing">Men's clothing</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="Women's clothing" id="Women's clothing" onChange={() => addFilter("Women's clothing")}/>
                                <label htmlFor="Women's clothing">Women's clothing</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="Jewelery" id="Jewelery" onChange={() => addFilter("Jewelery")} />
                                <label htmlFor="Jewelery">Jewelery</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="electronics" id="electronics" onChange={() => addFilter("electronics")} />
                                <label htmlFor="electronics">Electronics</label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="price_range">
                        <div className="title_filters">Price range</div>
                        <div className="checkbox_list">
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="lower_than_20" id="lower_than_20" onChange={() => addFilter("0-19")}/>
                                <label htmlFor="lower_than_20">Lower than $20</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="20_100" id="20_100" onChange={() => addFilter("20-99")}/>
                                <label htmlFor="20_100">$20 - $100</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="100_200" id="100_200" onChange={() => addFilter("100-200")}/>
                                <label htmlFor="100_200">$100 - $200</label>
                            </div>
                            <div className="checkbox_item">
                                <input type="checkbox" className='input_checkbox' name="more_than_200" id="more_than_200" onChange={() => addFilter("201-10000")}/>
                                <label htmlFor="more_than_200">More than $200</label>
                            </div>
                        </div>
                    </div>
                    {showFiltersMovil
                        ?
                        <div className="save_clear_filters">
                            <div className="clear_filters" onClick={() => closeAndClearFilters()}>CLEAR</div>
                            <div className="save_filters" onClick={() => closeFilters()}>SAVE</div>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="photographs">
                    <div className="photographs_list">
                        {productsPaginated.map((product) => {
                            return (
                                <div className="photography" key={product?.id}>
                                    <div id={"photo" + product?.id} className="image_and_button" style={{ backgroundImage: `url("${product?.url}")` }}>
                                        <div className="add_cart_photography" onClick={() => props.addToCart(product)}>ADD TO CART</div>
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