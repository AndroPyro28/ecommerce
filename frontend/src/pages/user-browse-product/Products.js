import React, { useEffect, useState } from 'react';
import Product from './Product';
import './products.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactPaginate from 'react-paginate';
import Footer from '../../components/footer/Footer'
import ProtectedNav from '../../components/protectedNav/ProtectedNav';
import ProtectedSideBar from '../../components/ProtectedSB/ProtectedSideBar';
import SearchArea from '../../components/search-area/SearchArea';
import productHooks from './productHooks';
import InventoryCart from '../../components/inventory-cart/InventoryCart';
import BuyerScreenItem from './BuyerScreenItem';
import SellerScreenItem from './SellerScreenItem';

function Products({ currentUser }) {
    const [category, setCategory] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const [activePageNumber, setActivePageNumber] = useState(0);

    const { fetchProducts } = productHooks({ setLoading, category, setItems });

    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [product, setProduct] = useState();
    const [refresh, setRefresh] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);
    const [popUp, setPopup] = useState(false);
    const [popupError, setPopupError] = useState(false);
    const [toggleProductScreen, setToggleProductScreen] = useState(false);
    const [viewMyItem, setViewMyItem] = useState(false);

    const [itemId, setItemId] = useState();

    let pageCount = 0; // page count or button count

    useEffect(async () => {
        fetchProducts();
        setActivePageNumber(0);
    }, [category, refresh])

    const onChangePage = ({ selected }) => { // setting a selected pages
        setActivePageNumber(selected)
    }
    const pageVisited = activePageNumber * 8; // activepage * 8 like page 2 * 8  = 16

    //console.log(items)

    const displayItems = items?.slice(pageVisited, pageVisited + 8).map((item) => {
        pageCount = Math.ceil(items.length / 8); //then here 16 to 16 + 8 that means 24 so from 16 to 24 items

        if (item.productStock > 0) {
            return (<Product
                setViewMyItem={setViewMyItem}
                key={item.productId}
                setToggleProductScreen={setToggleProductScreen}
                setItemId={setItemId}
                item={item}
                setPopup={setPopup}
                setPopupError={setPopupError}
                currentUser={currentUser}
            />)
        }
    })


    return (
        <div>
            {popUp && <div className="popup__message"><i class="fas fa-check-circle check"></i> The product has been added 1 quantity to your cart</div>}
            {popupError && <div className="popup__message"><i class="fas fa-times-circle x"></i> The product is out of stock (Try Reaching out the seller) </div>}

            {toggleSidebar && <ProtectedSideBar setToggleSidebar={setToggleSidebar} />}

            {
                toggleCart && <InventoryCart setToggleCart={setToggleCart} setRefresh={setRefresh} refresh={refresh}/>
            }

            {toggleProductScreen && <BuyerScreenItem 
            setToggleProductScreen={setToggleProductScreen} 
            setPopupError={setPopupError}
            itemId={itemId} currentUser={currentUser}/>}
           
            {viewMyItem && <SellerScreenItem setViewMyItem={setViewMyItem} itemId={itemId} />}

            <ProtectedNav
                currentUser={currentUser}
                setCategory={setCategory}
                setToggleSidebar={setToggleSidebar}
                currentPage="market" />
            {
                <h2 className="head__category">*{category ? category : "All Products"}*</h2>
            }
            <i className="fas fa-cart-arrow-down inventory__cart" onClick={() => setToggleCart(true)}></i>
            {/* <i className="fas fa-shopping-cart inventory__cart "></i> */}
            <SearchArea onChangePage={onChangePage} setActivePageNumber={setActivePageNumber} setProduct={setProduct} product={product} setRefresh={setRefresh} refresh={refresh} />

            <div className="products__screen__container">

                {
                    !loading ?
                        items?.length ?
                            displayItems
                            :
                            <div className="query__screen">No Items Avaiable</div>
                        :
                        <div className="query__screen"> <i class="fas fa-sync-alt rotateIcon"></i> loading please wait...</div>
                }
            </div>

            {
                items.length !== 0 &&
                <ReactPaginate
                    previousLabel={<i className="fas fa-backward"></i>}
                    nextLabel={<i className="fas fa-forward"></i>}
                    previousClassName="previousClassName"
                    nextClassName="nextClassName"
                    pageCount={pageCount} // finally styling all the buttons in pagination which you can access their property every button see on the app.css
                    onPageChange={onChangePage}
                    containerClassName="paginationContainer"
                    activeClassName="paginationActive"
                    disabledClassName="disabledClassName"
                />
            }

            {!loading && <Footer />}
        </div>
    )
}

export default Products
