import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { gold, logo, platinum } from "../../assets";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

const Checkout = () => {
  const navigate = useNavigate();
  const [passes, setPasses] = useState(
    JSON.parse(localStorage.getItem("passes")) || []
  );
  const groupedPasses = _.values(
    passes.reduce((acc, pass) => {
      const key = `${pass.type}-${pass.selectedDates.join(",")}`;
      if (!acc[key]) {
        acc[key] = { ...pass };
      } else {
        acc[key].quantity += pass.quantity;
        acc[key].price += pass.price;
      }
      return acc;
    }, {})
  );

  const subtotal = groupedPasses.reduce((acc, pass) => acc + pass.price, 0);

  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string().required("Mobile number is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        email: values?.email,
        passes: groupedPasses,
        _id: groupedPasses?.map((x) => x?._id)
      };

      try {
        const response = await axios.post(
          "http://192.168.29.219:5000/api//pass/send-mail",
          payload
        );
        console.log("Payment link and email sent:", response.data);
        localStorage.clear()
      } catch (error) {
        console.error("Error sending payment link or email:", error);
        alert("There was an error sending the payment link.");
      }
    },
  });

  return (
    <div>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(15, 38, 51, 1) 0%, rgba(49, 38, 19, 1) 50%, rgba(47, 12, 12, 1) 100%)",
        }}
      >
        <div className="flex flex-row justify-between items p-5">
          <img src={logo} alt="logo" className="h-[87px] ml-3" />
          <div className="flex gap-2 items-center text-white -pt-3">
            <IoLocationOutline className="text-2xl" />
            <p className="text-lg">Surat</p>
            <div className="ml-10">
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between px-10">
          <div className="w-1/2 pr-5">
            <div className="mt-5 flex justify-between">
              <p className="text-black text-xl font-[600]">Contact</p>
              <p className="underline text-blue-500 cursor-pointer">Login</p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                defaultValue={"akshay"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="mt-4 border px-5 py-2 w-full rounded-md"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500">{formik.errors.firstName}</div>
              ) : null}
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={formik.handleChange}
                defaultValue={"aasd"}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="mt-4 border px-5 py-2 w-full rounded-md"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-red-500">{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                defaultValue={'aksha2004vbi@gmail.com'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="mt-4 border px-5 py-2 w-full rounded-md"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
              <input
                type="text"
                placeholder="Enter Mobile Number"
                name="mobile"
                onChange={formik.handleChange}
                defaultValue={"123"}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
                className="mt-4 border px-5 py-2 w-full rounded-md"
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className="text-red-500">{formik.errors.mobile}</div>
              ) : null}
            </div>
            <p className="text-black text-xl mt-4 font-[600]">Delivery</p>
            <select className="mt-4 border px-2 py-2 w-full rounded-md">
              <option>India</option>
            </select>
            <input
              type="text"
              placeholder="Enter Address"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className="mt-1 border px-5 py-2 w-full rounded-md"
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500">{formik.errors.address}</div>
            ) : null}
            <button
              type="submit"
              className="w-full py-2 text-center text-white bg-blue-700 rounded-md my-4"
            >
              Pay Now
            </button>
          </div>

          <div className="w-1/2 bg-[#F5F5F5] px-4 py-5 h-screen border-l border-l-gray-300">
            {groupedPasses?.map((pass, i) => (
              <div
                key={i}
                className="flex items-center gap-5 mt-4 border-b border-b-gray-300 pb-2"
              >
                <div className="relative">
                  <img
                    src={pass.type === "Gold" ? gold : platinum}
                    alt="pass"
                    className="rounded-full w-20 h-20"
                  />
                  <div className="absolute top-0 right-0 bg-gray-500 text-white py-1 px-2 rounded-full text-[12px]">
                    {pass?.quantity}
                  </div>
                </div>
                <div className="flex flex-col ">
                  <p className="text-black ">
                    Daily {pass.type === "Gold" ? "Gold" : "Platinum"} Tickets
                  </p>
                  <div
                    className={` ${pass.selectedDates?.length > 1 ? "block" : "flex"
                      } gap-3 items-center`}
                  >
                    <p>{pass.type === "Gold" ? "Gold" : "Platinum"}</p>
                    <p>
                      {pass.selectedDates.map((date, index) => (
                        <p className="text-sm" key={index}>
                          {moment(date).format("DD/MM/YYYY")}
                        </p>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-auto flex justify-end">
                  <p>Rs. {pass?.price}.00</p>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 mt-4">
              <input
                type="text"
                placeholder="Discount Code"
                className="w-[90%] border py-3 px-5 rounded-md"
              />
              <button className="py-3 border px-4 border-blue-500 bg-blue-500 text-sm text-white rounded-md">
                Apply
              </button>
            </div>
            <div className="flex justify-between items-center gap-3 mt-5">
              <h4>
                SubTotal:{" "}
                <span className="font-semibold">{groupedPasses?.length}</span> items
              </h4>
              <p className="text-lg font-bold">₹{subtotal}.00</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
