import { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ShopLoginPage() {
  const {isSeller,isLoading} = useSelector((state) => state.seller);
  console.log(isSeller);
const navigate = useNavigate();
  useEffect(() =>{
    if(isSeller === true){
      navigate(`/dashboard`);
    }
  },[isLoading,isSeller])
  return (
    <div>
        <ShopLogin/>
    </div>
  )
}

export default ShopLoginPage