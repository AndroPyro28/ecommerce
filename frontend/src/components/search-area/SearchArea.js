import React from 'react'
import './search.css'

function SearchArea({ setProduct, product, setRefresh, refresh }) {

    const handleSearchProduct = () => {
        if(!product) return;
        alert(product);
    }
    return (
        <div className="search__product__area">
            <input type="text" placeholder="search product" onChange={(e) => setProduct(e.target.value)} />
            <button onClick={handleSearchProduct} type="button">Search</button>
            <i onClick={() => setRefresh(!refresh)} className="fas fa-sync-alt refresh"></i>
        </div>
    )
}

export default SearchArea
