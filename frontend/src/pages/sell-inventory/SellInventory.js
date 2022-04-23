import React, { useEffect, useState } from 'react'
import ProtectedNav from '../../components/protectedNav/ProtectedNav';
import ProtectedSideBar from '../../components/ProtectedSB/ProtectedSideBar';
import './sellinv.css';
import ReactPaginate from 'react-paginate';
import Footer from '../../components/footer/Footer'
import SellItem from './SellItem';
import axios from 'axios';
import Cookies from 'js-cookie';
import SellingProducts from './SellingProducts';
import inventoryHooks from './inventoryHooks';
import UpdateProducts from './UpdateProducts';

function SellInventory({ currentUser, setRefresh, refresh }) {

    const [toggleProductUpload, setToggleProductUpload] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [itemInventory, setItemInventory] = useState([]);
    const [toggleUpdateScreen, setToggleUpdateScreen] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState({});

    useEffect(() => {
        setItemInventory(currentUser.sellingItems);
    }, []);

    const [activePageNumber, setActivePageNumber] = useState(0);
    const [popup, setPopup] = useState(false);
    const { disPlayItems, pageCount, onChangePage } = inventoryHooks({ //inventory hooks
        setRefresh,
        refresh,
        itemInventory,
        setActivePageNumber,
        activePageNumber,
        setToggleUpdateScreen,
        setProductToUpdate
    });


    return (
        <div>
            { popup && <div className="popup__message" >Product has been added to your selling items</div>}

            {
                toggleSidebar && <ProtectedSideBar setToggleSidebar={setToggleSidebar} /> //sidebar for mobile
            }


            {
                toggleProductUpload && <SellItem // selling item
                    setToggleProductUpload={setToggleProductUpload}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    setPopup={setPopup}
                />
            }
            {
                toggleUpdateScreen && <UpdateProducts //updating item
                    setRefresh={setRefresh}
                    refresh={refresh}
                    setToggleUpdateScreen={setToggleUpdateScreen}
                    productToUpdate={productToUpdate}
                />
            }

            <ProtectedNav
                currentUser={currentUser}
                setToggleSidebar={setToggleSidebar}
                currentPage="inventory"
            />
            <div className="list__selling__products">
                <button onClick={() => setToggleProductUpload(true)} ><i className="fas fa-plus"></i> Sell / Post Product</button>

                <h1>Your selling items</h1>
                {
                    disPlayItems.length !== 0 ? disPlayItems : <div className="query__screen">No item on sell</div>
                }

                {
                    disPlayItems.length !== 0 &&
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



            </div>
            <Footer />
        </div>
    )
}

export default SellInventory;
