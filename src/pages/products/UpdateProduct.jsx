import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { fetchBrandsAction } from "../../redux/slices/brandSlices";
import { fetchCategoriesAction } from "../../redux/slices/categorySlices";
import { fetchColorsAction } from "../../redux/slices/colorSlices";
import {
  fetchProductAction,
  updateProductAction,
} from "../../redux/slices/productSlices";

import Button from "../../components/Button";
import ErrorMsg from "../../components/messages/ErrorMsg";
import SuccessMsg from "../../components/messages/SuccessMsg";
import SpinLoading from "../../components/loaders/SpinLoading";

//animated components for react-select
const animatedComponents = makeAnimated();

export default function UpdateProduct() {
  //dispatch
  const dispatch = useDispatch();
  //get id from params
  const { id } = useParams();

  // React Select Customization
  const colorStyles = {
    control: (base, state) => ({
      ...base,
      height: 50,
      minHeight: 50,
      color: "red",
      background: "rgba(0, 0, 0, 0.5)",
      borderColor: state.isFocused ? "white" : "zinc-200",
    }),

    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: "#fff",
      backgroundColor: "#1c1c43",
      background: isFocused ? "#6b7280" : isSelected ? "#1e1e1e" : "#1c1c43",
      zIndex: 1,
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: "50px",
      padding: "0 15px",
      paddingTop: 0,
      paddingBottom: 0,
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      height: "50px",
    }),
  };

  // Fetch Single Product
  useEffect(() => {
    dispatch(fetchProductAction(id));
  }, [id, dispatch]);

  // Get Data from Store
  const {
    product: { product },
    isUpdated,
    loading,
    error,
  } = useSelector((state) => state?.products);

  // Sizes
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [sizeOption, setSizeOption] = useState(product?.sizes || []);
  const handleSizeChange = (sizes) => {
    setSizeOption(sizes);
  };

  // Converted Sizes
  const sizesOptionsConverted = sizes?.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  // Categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  // Get Data from Store
  const { categories } = useSelector((state) => state?.categories?.categories);

  // Brands
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);
  // Get Data from Store
  const {
    brands: { brands },
  } = useSelector((state) => state?.brands);

  // Colors
  const [colorsOption, setColorsOption] = useState(product?.colors || []);
  const {
    colors: { colors },
  } = useSelector((state) => state?.colors);
  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  const handleColorChange = (colors) => {
    setColorsOption(colors);
  };

  // Converted Colors
  const colorsConverted = colors?.map((color) => {
    return {
      value: color?.name,
      label: color?.name,
    };
  });

  //---form data---
  const [formData, setFormData] = useState({
    name: product?.name,
    desc: product?.desc,
    category: product?.category,
    brand: product?.brand,
    price: product?.price,
    totalQty: product?.totalQty,
    sizes: "",
    colors: "",
  });

  // Update formData when product changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: product?.name,
      desc: product?.desc,
      category: product?.category,
      brand: product?.brand,
      price: product?.price,
      totalQty: product?.totalQty,
    }));
  }, [product]);

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(
      updateProductAction({
        ...formData,
        id,
        colors: colorsOption?.map((color) => color.label),
        sizes: sizeOption?.map((size) => size?.label),
      })
    );

    //reset form data
    setFormData({
      name: "",
      description: "",
      category: "",
      sizes: "",
      brand: "",
      colors: "",
      images: "",
      price: "",
      totalQty: "",
    });
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {isUpdated && <SuccessMsg message="Product Updated Successfully" />}

      {loading ? (
        <SpinLoading />
      ) : (
        <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full">
            <h2 className="text-center text-2xl md:text-3xl font-bold text-white tracking-wider">
              Update Product
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
            <div className="bg-light-blue py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form
                className="flex flex-col gap-0 lg:gap-3 space-y-4"
                onSubmit={handleOnSubmit}
              >
                <div>
                  <label className="block text-md font-medium text-zinc-200">
                    Product Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      value={formData?.name}
                      onChange={handleOnChange}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                    />
                  </div>
                </div>

                {/* Select Category */}
                <div className="w-full">
                  <label className="block text-md font-medium text-zinc-200">
                    Select Category
                  </label>
                  <div className="mt-2">
                    <select
                      name="category"
                      value={formData?.category}
                      onChange={handleOnChange}
                      className="mt-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px] border"
                    >
                      <option>-- Select Category --</option>
                      {categories?.map((category) => (
                        <option key={category?._id} value={category?.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Size Option */}
                <div className="w-full">
                  <label className="block text-md font-medium text-zinc-200">
                    Select Size
                  </label>
                  <div className="mt-2">
                    <Select
                      styles={colorStyles}
                      components={animatedComponents}
                      placeholder="-- Select Size --"
                      isMulti
                      name="sizes"
                      options={sizesOptionsConverted}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isClearable={true}
                      isLoading={false}
                      isSearchable={true}
                      closeMenuOnSelect={false}
                      onChange={(item) => handleSizeChange(item)}
                    />
                  </div>
                </div>

                {/* Select Color */}
                <div className="w-full">
                  <label className="block text-md font-medium text-zinc-200">
                    Select Color
                  </label>
                  <div className="mt-2">
                    <Select
                      styles={colorStyles}
                      components={animatedComponents}
                      placeholder="-- Select Color --"
                      isMulti
                      name="colors"
                      options={colorsConverted}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isClearable={true}
                      isLoading={false}
                      isSearchable={true}
                      closeMenuOnSelect={false}
                      onChange={(e) => handleColorChange(e)}
                    />
                  </div>
                </div>

                {/* Select Brand */}
                <div className="w-full">
                  <label className="block text-md font-medium text-zinc-200">
                    Select Brand
                  </label>
                  <div className="mt-2">
                    <select
                      name="brand"
                      value={formData?.brand}
                      onChange={handleOnChange}
                      className="mt-2 block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px] border"
                    >
                      <option>-- Select Brand --</option>
                      {brands?.map((brand) => (
                        <option key={brand?._id} value={brand?.name}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-md font-medium text-zinc-200">
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      name="price"
                      value={formData?.price}
                      onChange={handleOnChange}
                      type="number"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-md font-medium text-zinc-200">
                    Total Quantity
                  </label>
                  <div className="mt-2">
                    <input
                      name="totalQty"
                      value={formData?.totalQty}
                      onChange={handleOnChange}
                      type="number"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-md font-medium text-zinc-200"
                  >
                    Add Product Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      rows={4}
                      name="description"
                      value={formData?.desc}
                      onChange={handleOnChange}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Button type="smallFormBtn">Update Product</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
