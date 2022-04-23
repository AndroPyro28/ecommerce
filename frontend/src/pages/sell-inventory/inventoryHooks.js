import React from 'react'
import SellingProducts from './SellingProducts';
function inventoryHooks({itemInventory, setActivePageNumber, activePageNumber, refresh, setRefresh, setToggleUpdateScreen, setProductToUpdate}) {
    const pageVisited = activePageNumber * 5;

    const pageCount = Math.ceil(itemInventory.length / 5);

    const onChangePage = ({ selected }) => { // setting a selected pages
        setActivePageNumber(selected);
    }

    const disPlayItems = 
    itemInventory
    .slice(0)
    .reverse()
    .slice(pageVisited, pageVisited + 5)
    .map(item => <SellingProducts 
        setProductToUpdate={setProductToUpdate}
        key={item.productId} 
        item={item}
        setRefresh={setRefresh} 
        refresh={refresh}
        setToggleUpdateScreen={setToggleUpdateScreen}
        />)

    return {disPlayItems, onChangePage, pageCount}
}

export default inventoryHooks
