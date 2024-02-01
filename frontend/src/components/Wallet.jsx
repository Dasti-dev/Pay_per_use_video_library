import React from 'react'
// import { useState } from 'react'
import { useSelector } from 'react-redux'

function Wallet() {
  const id = useSelector(state => state.id)

  return (
    <div className='walletPage'>
        <p>WalletPage</p>   
    </div>
  )
}

export default Wallet
