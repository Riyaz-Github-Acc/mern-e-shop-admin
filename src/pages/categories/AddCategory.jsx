import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ErrorMsg from "../../components/messages/ErrorMsg";
import SuccessMsg from "../../components/messages/SuccessMsg";
import CircularLoading from "../../components/loaders/CircularLoading";
import { createCategoryAction } from "../../redux/slices/categorySlices";
import Button from "../../components/Button";

export default function CategoryToAdd() {
  //Dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });

  //---onChange---
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //File
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  //File Handle Change
  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    //Image Validation
    if (newFile?.size > 1000000) {
      setFileError(`${newFile?.name} is too large`);
    }
    if (!newFile?.type?.startsWith("image/")) {
      setFileError(`${newFile?.name} is not an image`);
    }

    setFile(newFile);
  };

  //Get Data from Store
  const { loading, error, isAdded } = useSelector((state) => state?.categories);

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();

    //Dispatch
    dispatch(
      createCategoryAction({
        name: formData?.name,
        file,
      })
    );

    //Reset Form
    setFormData({
      name: "",
    });
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {fileError && <ErrorMsg message={fileError} />}
      {isAdded && <SuccessMsg message="Category created successfully" />}
      <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white tracking-wider">
            Add Product Category
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
                  Category Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleOnChange}
                    value={formData?.name}
                    type="text"
                    name="name"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-[15px] py-2 shadow-sm focus:border-white focus:outline-none focus:ring-zinc-200 text-[16px]"
                  />
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

              <div className="flex flex-col items-center justify-center">
                {loading ? (
                  <Button type="smallFormBtn" disabled>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <div>Loading...</div>
                      <CircularLoading />
                    </div>
                  </Button>
                ) : (
                  <Button type="smallFormBtn">Add Category</Button>
                )}
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-light-blue px-2 text-white">Or</span>
                </div>
              </div>

              <div className="mt-6 flex flex-row items-center justify-center gap-3">
                <div className="flex items-center justify-center">
                  <Link to="/add-brand" className="whitespace-nowrap">
                    <Button type="loginBtn">Add Brand</Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center">
                  <Link to="/add-color" className="whitespace-nowrap">
                    <Button type="loginBtn">Add Color</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
