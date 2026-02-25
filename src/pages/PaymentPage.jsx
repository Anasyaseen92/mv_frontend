import CheckoutSteps from "../components/CheckOut/CheckoutSteps"
import Header from "../components/Layout/Header"
import Payment from "../components/Payment/Payment"
import Footer from "../components/Route/Footer"


const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
       <Header/>
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment/>
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage