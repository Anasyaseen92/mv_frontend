
import Lottie from "react-lottie";
import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import animationData from "../assets/Animation/RnGTdKRCK1.json"
import CheckoutSteps from "../components/CheckOut/CheckoutSteps";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <br/>
      <br/>
       <CheckoutSteps active={3} />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;