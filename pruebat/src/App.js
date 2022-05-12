import './App.css';
import Header from './modules/header/header.jsx';
import ProductsAndFilters from './modules/products_and_filters/products_and_filters.jsx';
import { useState } from 'react';

function App() {


  const [shoppingCart, setShoppingCart] = useState([]);

  /*FUNCIÓN QUE AÑADE PRODUCTOS AL CARRITO. ES POSIBLE AÑADIRLO DESDE OTROS COMPONENTES GRACIAS A LOS PROPS*/
  const addToCart = (item) => {
    setShoppingCart(shoppingCart => [...shoppingCart, item])
  }

  const clearCart = (item) => {
    setShoppingCart(shoppingCart => [])
  }

  return (
    <div className="App" id ="App">
      <div className="container">
        <Header products={shoppingCart} clearCart={clearCart} />
        <ProductsAndFilters addToCart={addToCart} />
      </div>
    </div>
  );
}

export default App;
