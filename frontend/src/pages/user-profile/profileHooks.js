import React from 'react'

function profileHooks({ transactionHistory }) {
    
    const noTransaction = () => {
        return transactionHistory?.length === undefined ? 0 : transactionHistory.length;  
    }
    return { noTransaction }
}

export default profileHooks
