/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import Button from "../../components/Button";
import ErrorMsg from "../../components/messages/ErrorMsg";
import SuccessMsg from "../../components/messages/SuccessMsg";
import CircularLoading from "../../components/loaders/CircularLoading";

import { fetchBrandsAction } from "../../redux/slices/brandSlices";
import { fetchColorsAction } from "../../redux/slices/colorSlices";
import { createProductAction } from "../../redux/slices/productSlices";
import { fetchCategoriesAction } from "../../redux/slices/categorySlices";

//animated components for react-select
const animatedComponents = makeAnimated();

export default function AddProduct() {
  const dispatch = useDispatch();

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

  // Categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  // Select Data from Store
  const { categories } = useSelector((state) => state?.categories?.categories);

  // Brands
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  // Select Data from Store
  const { brands } = useSelector((state) => state?.brands?.brands);

  // Colors
  const [colorsOption, setColorsOption] = useState([]);
  const { colors } = useSelector((state) => state?.colors?.colors);

  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  const handleColorChange = (colors) => {
    setColorsOption(colors);
  };

  //Converted Colors
  const colorsConverted = colors?.map((color) => {
    return {
      value: color?.name,
      label: color?.name,
    };
  });

  // Sizes
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [sizesOption, setSizesOption] = useState([]);
  const handleSizeChange = (sizes) => {
    setSizesOption(sizes);
  };

  // Converted Sizes
  const sizesOptionsConverted = sizes.map((size) => {
    return {
      label: size,
      value: size,
    };
  });

  //Images
  const [files, setFiles] = useState([]);
  const [fileErrors, setFileErrors] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    //Image Validation
    const newErrors = [];
    newFiles.forEach((file) => {
      if (file?.size > 1000000) {
        newErrors.push(`${file?.name} is too large`);
      }
      if (!file?.type?.startsWith("image/")) {
        newErrors.push(`${file?.name} is not an image`);
      }
    });
    setFiles(newFiles);
    setFileErrors(newErrors);
  };

  //---form data---
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    category: "",
    sizes: "",
    brand: "",
    colors: "",
    price: "",
    totalQty: "",
  });

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get Product from the Store
  const { product, isAdded, loading, error } = useSelector(
    (state) => state?.products
  );

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createProductAction({
        ...formData,
        files,
        colors: colorsOption?.map((color) => color?.label),
        sizes: sizesOption?.map((size) => size?.label),
      })
    );

    //Reset Form Data
    setFormData({
      name: "",
      desc: "",
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
      {fileErrors?.length > 0 && (
        <ErrorMsg message="file too large or upload an image" />
      )}
      {isAdded && <SuccessMsg message="Product Added Successfully" />}

      <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white tracking-wider">
            Create New Product
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
                  Color Name
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
                    value={formData.category}
                    onChange={handleOnChange}
                    className="mt-2  block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px] border"
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
                    value={formData.brand}
                    onChange={handleOnChange}
                    className="mt-2  block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px] border"
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

              {/* Upload Image */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label className="block text-md font-medium text-zinc-200 sm:mt-px sm:pt-2">
                  Upload Image
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-500"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-md text-gray-500">
                        <label className="relative cursor-pointer rounded-md bg-light-blue font-medium text-zinc-200 focus-within:outline-none focus-within:ring-1 focus-within:ring-zinc-200 focus-within:ring-offset-1 hover:text-sky-500">
                          <span>Upload files</span>
                          <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="cursor-pointer"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-zinc-200">
                        PNG, JPG, JPEG up to 1MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="w-full">
                <label className="block text-md font-medium text-zinc-200">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="w-full">
                <label className="block text-md font-medium text-zinc-200">
                  Total Quantity
                </label>
                <div className="mt-2">
                  <input
                    name="totalQty"
                    value={formData.totalQty}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-md font-medium text-zinc-200">
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    rows={5}
                    name="desc"
                    value={formData.desc}
                    onChange={handleOnChange}
                    className="block w-full rounded-md focus:border-white border shadow-sm focus:outline-none focus:ring-zinc-200 text-[16px] p-[15px]"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                {loading ? (
                  <Button type="smallFormBtn" disabled>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <div>Loading...</div>
                      <CircularLoading />
                    </div>
                  </Button>
                ) : (
                  <Button type="smallFormBtn">Add Product</Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
