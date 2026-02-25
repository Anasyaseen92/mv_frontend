import React from 'react'
import CheckOut from '../components/CheckOut/CheckOut'
import Header from '../components/Layout/Header'
import Footer from '../components/Route/Footer'
import CheckoutSteps from '../components/CheckOut/CheckoutSteps'

function CheckoutPage() {
  return (
    <div>
      <Header/>
      <br/>
      <br/>
      <br/>
      <CheckoutSteps  active={1}/>
      <CheckOut/>
        <br />
      <br />
      <Footer/>
    </div>
  )
}

export default CheckoutPage