import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAdminPass } from "../../context/AddminPassContext";

const CreatePass = () => {
  const [editingPass, setEditingPass] = useState(null);
  const { passes, fetchPasses } = useAdminPass();
  const [isThreeDaysCombo, setIsThreeDaysCombo] = useState(false);
  const [discountType, setDiscountType] = useState("percentage"); // Default to percentage

  useEffect(() => {
    fetchPasses();
  }, []);

  const formik = useFormik({
    initialValues: {
      type: "",
      price: "",
      discount: "",
      discountType: "percentage",
      isThreeDaysCombo: false // Add discountType to initial values
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      type: Yup.string()
        .required("Pass type is required")
        .test("unique-type", "This pass type already exists", function (value) {
          if (editingPass && editingPass.type === value) {
            return true;
          }
          return !passes.some((pass) => pass.type === value);
        }),
      price: Yup.number()
        .required("Price is required")
        .min(1, "Price cannot be negative or 0"),
      discount: Yup.number()
        .required("Discount is required")
        .min(0, "Discount cannot be negative"), // Adjusted for valid discount
    }),
    onSubmit: async (values, { resetForm }) => {
      if (editingPass) {
        try {
          await axios.put(
            `http://192.168.29.219:5000/api/admin/update-pass/${editingPass._id}`,
            values
          );
          fetchPasses();
          setEditingPass(null);
          resetForm();
        } catch (error) {
          console.error("Error updating pass", error);
        }
      } else {
        try {
          await axios.post("http://192.168.29.219:5000/api/admin/create-pass", values);
          fetchPasses();
          resetForm();
        } catch (error) {
          console.error("Error creating pass", error);
        }
      }
    },
  });

  const handleEdit = (pass) => {
    setEditingPass(pass);
    formik.setValues({
      type: pass.type,
      price: pass.price,
      discount: pass.discount,
      discountType: pass.discountType || "percentage", 
    });
    setIsThreeDaysCombo(pass.isThreeDaysCombo || false); // Adjusting for existing state
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.29.219:5000/api/admin/delete-pass/${id}`);
      fetchPasses();
    } catch (error) {
      console.error("Error deleting pass", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Pass Management</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col  bg-white p-4 shadow-lg rounded-md"
      >
        <input
          type="text"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          placeholder="Pass Type"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        {formik.errors.type && formik.touched.type && (
          <div className="text-red-500">{formik.errors.type}</div>
        )}
        <input
          type="number"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          placeholder="Price"
          className="w-full px-4 py-2 border rounded-md mb-4"
        />
        {formik.errors.price && formik.touched.price && (
          <div className="text-red-500">{formik.errors.price}</div>
        )}

    
        <label className="flex items-center justify-start mb-4">
          <input
            type="checkbox"
            checked={isThreeDaysCombo}
            onChange={(e) => {
              setIsThreeDaysCombo(e.target.checked);
              formik.setFieldValue("discount", ""); // Reset discount if checkbox is toggled
            }}
          />
          <span className="ml-2">Enable 3 Days Combo</span>
        </label>

        {/* Conditional rendering for discount input */}
        {isThreeDaysCombo && (
          <div className="flex justify-between gap-10 ">
            <input
              type="number"
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
              placeholder="Discount"
              className="w-full px-4 py-2 border rounded-md mb-4"
            />
            {formik.errors.discount && formik.touched.discount && (
              <div className="text-red-500">{formik.errors.discount}</div>
            )}
            <select
              name="discountType"
              value={formik.values.discountType}
              onChange={(e) => {
                formik.setFieldValue("discountType", e.target.value);
                setDiscountType(e.target.value); // Update the discount type state
              }}
              className="w-full px-4 py-2 border rounded-md mb-4"
            >
              <option value="percentage">Discount in %</option>
              <option value="currency">Discount in Rs</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {editingPass ? "Update Pass" : "Add Pass"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl mb-4">Pass List</h2>
        <div className="grid grid-cols-3 gap-4">
          {passes.map((pass) => (
            <div
              key={pass._id}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center"
            >
              <p className="text-xl font-semibold">{pass.type}</p>
              <p>Price: {pass.price}</p>
              {pass.discount && (
                <p>
                  Discount: {pass.discount} {pass.discountType === "percentage" ? "%" : "Rs"}
                </p>
              )}
              <div className="flex mt-4">
                <button
                  onClick={() => handleEdit(pass)}
                  className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pass._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePass;
