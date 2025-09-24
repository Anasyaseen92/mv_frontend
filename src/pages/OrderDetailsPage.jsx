import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Route/Footer'
import UserOrderDetails from '../components/Shop/UserOrderDetails'

function OrderDetailsPage() {
  return (
    <div>
        <Header/>
        <UserOrderDetails/>
        <Footer/>
    </div>
  )
}

export default OrderDetailsPage