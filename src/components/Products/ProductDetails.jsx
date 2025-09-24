import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url, server } from "../../../server";
import { getAllProductsShop } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import Ratings from "./Ratings";
import axios from "axios";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";

function ProductDetails({ data }) {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [shop, setShop] = useState(null); // ✅ store shop info here

  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const allProducts = useSelector((state) => state.products.allProducts);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { id } = useParams();

  // ✅ fetch shop info when product loads
  useEffect(() => {
    if (data?.shopId) {
      axios
        .get(`${server}/seller/get-shop-info/${data.shopId}`)
        .then((res) => {
          setShop(res.data.shop);
        })
        .catch((err) => {
          console.error("Error fetching shop info:", err);
        });
    }
  }, [data?.shopId]);

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [dispatch, wishlist, data?._id, id]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count > 1 ? count - 1 : 1);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shopId;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Error creating chat");
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addCartToHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
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
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[80%] 800px:w-[80%] min-h-screen`}>
          <div className="w-full py-5">
            <div
              className="w-full flex flex-col 800px:flex-row justify-between"
              style={{ gap: "6%" }}
            >
              {/* LEFT: Product Images */}
              <div className="w-full md:w-[47%]">
                <img
                  src={`${data?.images[select]}`}
                  alt=""
                  className="w-full max-h-[500px] object-contain mb-4"
                />
                <div className="w-full flex gap-3">
                  {data?.images?.map((i, index) => (
                    <div
                      key={index}
                      className={`${
                        select === index ? "border-2 border-red-500" : ""
                      } cursor-pointer`}
                      onClick={() => setSelect(index)}
                    >
                      <img
                        src={`${i}`}
                        alt=""
                        className="h-[100px] object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Product Info */}
              <div className="w-full 800px:w-[47%] pt-5">
                <h1 className={`${styles.productTitle} mb-3`}>{data.name}</h1>
                <p className="mb-3">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ${data.discountPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  {/* Quantity Buttons */}
                  <div>
                    <button
                      className="bg-teal-500 text-white font-bold rounded-l px-4 py-2"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-teal-500 text-white font-bold rounded-r px-4 py-2"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  {/* Wishlist Button */}
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color="red"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        color="#333"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div
                  className={`${styles.button} mt-6 rounded h-11 flex items-center`}
                  onClick={() => addCartToHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart />
                  </span>
                </div>

                {/* Seller Info */}
                {shop && (
                  <div className="flex items-center pt-8">
                    <img
                      src={shop?.avatar || "/default-avatar.png"}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div className="pr-8">
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {shop?.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({averageRating}/5) Ratings
                      </h5>
                    </div>
                    <div
                      className={`${styles.button} bg-[#6443d1] mt-4 rounded h-11`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white flex items-center">
                        Send Message <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Tabs */}
          <ProductDetailsInfo
            data={data}
            allProducts={allProducts}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
            shop={shop} // ✅ pass shop data
          />
        </div>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({
  data,
  allProducts,
  totalReviewsLength,
  averageRating,
  shop,
}) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <h5
          className="cursor-pointer font-[600]"
          onClick={() => setActive(1)}
        >
          Product Details
        </h5>
        <h5
          className="cursor-pointer font-[600]"
          onClick={() => setActive(2)}
        >
          Product Reviews
        </h5>
        <h5
          className="cursor-pointer font-[600]"
          onClick={() => setActive(3)}
        >
          Seller Information
        </h5>
      </div>

      {active === 1 && (
        <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
          {data.description}
        </p>
      )}

      {active === 2 && (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data?.reviews?.length > 0 ? (
            data.reviews.map((item, index) => (
              <div key={item._id || index} className="w-full flex my-2">
                <img
                  src={
                    item?.user?.avatar
                      ? `${backend_url}/${item.user.avatar}`
                      : "/default-avatar.png"
                  }
                  alt="user avatar"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="pl-2">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">
                      {item?.user?.name || "Anonymous"}
                    </h1>
                    <Ratings rating={item?.rating || 0} />
                  </div>
                  <p>{item?.comment || "No comment provided."}</p>
                </div>
              </div>
            ))
          ) : (
            <h5>No Reviews have for this product!</h5>
          )}
        </div>
      )}

      {active === 3 && shop && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${shop._id}`}>
              <div className="flex items-center">
                <img
                  src={shop?.avatar || "/default-avatar.png"}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{shop?.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>

            <p className="pt-2">{shop?.description}</p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 flex items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">{allProducts?.length}</span>
              </h5>
              <h5 className="font-[600]">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/preview/${shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
