import React, { useEffect, useState } from "react";
import { server } from "../../../server";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllProductsShop } from "../../redux/actions/product";
import { Link, useParams } from "react-router-dom";

function ShopInfo({ isOwner }) {
  const allProducts = useSelector((state) => state.products.allProducts);
  const { seller } = useSelector((state) => state.seller); // ✅ fallback to logged-in seller
  const [data, setData] = useState({});
  const [isLoading,setIsLoading] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

useEffect(() => {
  const shopId = id || seller?._id;

  console.log("🟡 id from params:", id);
  console.log("🟡 seller from redux:", seller);
  console.log("🟡 final shopId:", shopId);

  if (!shopId) {
    console.error("❌ No shopId found! Skipping API call.");
    return;
  }

  dispatch(getAllProductsShop(shopId));
  setIsLoading(true);

  axios
    .get(`${server}/seller/get-shop-info/${shopId}`)
    .then((res) => {
      console.log("✅ Shop API Response:", res.data);
      setData(res.data.shop);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("❌ Shop API Error:", error.response?.data || error.message);
      setIsLoading(false);
    });
}, [id, seller, dispatch]);




  const logoutHandler = async () => {
    await axios.get(`${server}/seller/logout`, { withCredentials: true });
    window.location.reload();
  };

  const totalReviewsLength =
    allProducts?.reduce((acc, product) => acc + product.reviews.length, 0) || 0;

  const totalRatings =
    allProducts?.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    ) || 0;

  const averageRating =
    totalReviewsLength > 0 ? (totalRatings / totalReviewsLength).toFixed(1) : 0;

  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={data?.avatar}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>

        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
          {data?.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{data?.address}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">
          {allProducts ? allProducts.length : 0}
        </h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000a6]">{averageRating}/5</h4>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000a6]">{data?.createdAt?.slice(0, 10)}</h4>
      </div>

      {isOwner && (
        <div className="py-3 px-4">
          <Link to="/settings">
            <div
              className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            >
              <span className="text-white">Edit Shop</span>
            </div>
          </Link>
          <div
            onClick={logoutHandler}
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopInfo;
