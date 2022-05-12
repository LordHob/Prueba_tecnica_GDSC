import './App.css';
import Header from './modules/header/header.jsx';
import ProductsAndFilters from './modules/products_and_filters/products_and_filters.jsx';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <ProductsAndFilters />
      </div>
    </div>
  );
}

export default App;
