import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import {
  deleteUserAddress,
  updateUserInfomation,
  updatUserAddress,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { Country, State, City } from "country-state-city";
import { getAllOrdersOfUser } from "../../redux/actions/order";
function ProfileContent({ active, setActive }) {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      dispatch({ type: "clearErrors" });
    }
  }, [error, successMessage]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfomation(name, email, phoneNumber, password));
    toast.success("Ok boss g");
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file); // 👈 must match multer.single("avatar")

    try {
      const { data } = await axios.put(
        `${server}/user/update-avatar`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      dispatch({ type: "LoadUserSuccess", payload: data.user });
      toast.success("Avatar updated!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="w-full min-h-screen">
      {active === 1 && (
        <>
          <div
            className="flex justify-center w-full"
            onClick={() => setActive(1)}
          >
            <div className="relative">
              <img
                className="rounded-full w-[150px] h-[150px] object-cover border-[3px] border-blue-700"
                src={`${user?.avatar}`}
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />

          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:block flex  pb-3">
                <div className="w-[50%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] `}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}

                <div className="w-[50%] 800px:w-[100%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] `}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* 2nd hai boss */}

              <div className="w-full flex 800px:block pb-3">
                {/* Phone Number */}

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] `}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* 3rd hai boss */}

              <div className="w-full flex 800px:block pb-3">
                {/* password */}

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <input
                  required
                  value="Update"
                  type="submit"
                  className={`w-[250px] bg-blue-600 h-[40px] border border-[#000000] text-center cursor-pointer text-white rounded-[3px] mt-8`}
                />
              </div>
            </form>
          </div>
        </>
      )}
      {/*Orders*/}
      {active === 2 && (
        <div onClick={() => setActive(2)}>
          <AllOrders />
        </div>
      )}
      {/* Refunds */}

      {active === 3 && (
        <div onClick={() => setActive(3)}>
          <AllRefundOrders />
        </div>
      )}
      {/* Track order page */}

      {active === 5 && (
        <div onClick={() => setActive(5)}>
          <TrackOrder />
        </div>
      )}
      {/* Payment method page */}

      {active === 6 && (
        <div onClick={() => setActive(6)}>
          <ChangePassword />
        </div>
      )}

      {/* Address page */}

      {active === 7 && (
        <div onClick={() => setActive(7)}>
          <Address />
        </div>
      )}
    </div>
  );
}
const AllOrders = () => {
  const {orders} = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
dispatch(getAllOrdersOfUser(user._id))
  })
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,

        itemsQty: item.cart.length,

        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
              />
    </div>
  );
};
const AllRefundOrders = () => {
  const {orders} = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
dispatch(getAllOrdersOfUser(user._id))
  })

  const eligibleOrder = orders && orders.filter((item) =>item.status === "Processing refund")
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

 eligibleOrder &&
    eligibleOrder.forEach((item) => {
      row.push({
        id: item._id,

        itemsQty: item.cart.length,

        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};
const TrackOrder = () => {
   const {orders} = useSelector((state) => state.order);
  const {user} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
dispatch(getAllOrdersOfUser(user._id))
  })

  const eligibleOrder = orders && orders.filter((item) =>item.status === "Processing refund")
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

 eligibleOrder &&
    eligibleOrder.forEach((item) => {
      row.push({
        id: item._id,

        itemsQty: item.cart.length,

        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

 

 


  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        pageSize={10}
      />
    </div>
  );
};

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  
  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Change Successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
  <h1 className="text-xl sm:text-2xl text-center font-semibold text-[#000000ba] pb-3">
    Change Password
  </h1>

  <div className="w-full">
    <form
      onSubmit={passwordChangeHandler}
      className="flex flex-col items-center space-y-4"
    >
      {/* Old Password */}
      <div className="w-full max-w-md">
        <label className="block pb-1 text-sm font-medium">
          Enter your old password
        </label>
        <input
          type="password"
          className="w-full h-9 px-2 border rounded text-sm focus:outline-none focus:ring focus:ring-indigo-300"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>

      {/* New Password */}
      <div className="w-full max-w-md">
        <label className="block pb-1 text-sm font-medium">
          Enter your new password
        </label>
        <input
          type="password"
          className="w-full h-9 px-2 border rounded text-sm focus:outline-none focus:ring focus:ring-indigo-300"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div className="w-full max-w-md">
        <label className="block pb-1 text-sm font-medium">
          Enter your confirm password
        </label>
        <input
          type="password"
          className="w-full h-9 px-2 border rounded text-sm focus:outline-none focus:ring focus:ring-indigo-300"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div className="w-full max-w-md">
        <input
          type="submit"
          value="Update"
          className="w-full h-9 text-sm border border-indigo-600 text-indigo-600 rounded cursor-pointer hover:bg-indigo-600 hover:text-white transition"
        />
      </div>
    </form>
  </div>
</div>

  );
};
const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  };
  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0000004b] flex items-center justify-center z-10">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="flex w-full justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>

            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  {/* Country */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="">choose your country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* City */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="">choose your city</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Address 1 */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>

                  {/* Address 2 */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  {/* Zip Code */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  {/* Address Type */}
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-full border h-[40px] rounded-[5px]"
                    >
                      <option value="">Choose your Address Type</option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Submit */}
                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Address
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />

      {/* */}
      {user &&
        user.addresses.map((item, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-[4px] shadow px-3 py-4 mb-4"
          >
            {/* Address Type */}
            <div className="flex items-center justify-between">
              <h5 className="font-[600] text-[14px]">{item.addressType}</h5>
              <AiOutlineDelete
                size={22}
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(item)}
              />
            </div>

            {/* Divider Line */}
            <div className="border-t my-2"></div>

            {/* Address Details */}
            <div className="text-sm text-gray-700 leading-6">
              <p>
                {item.address1}, {item.address2}
              </p>
              <p>
                {item.city}, {item.country} - {item.zipCode}
              </p>
              <p>{user && user?.phoneNumber}</p>
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;
