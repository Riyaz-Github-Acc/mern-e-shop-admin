/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Button from "../../components/Button";

export default function CategoryToAdd() {
  let handleCategory;

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white tracking-wider">
            Select Option
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto w-full max-w-[100%] md:max-w-3xl">
          <div className="bg-light-blue py-8 px-4 shadow sm:rounded-lg sm:px-10 overflow-hidden">
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3">
              <div className="flex items-center justify-center">
                <Link to="/add-brand" className="whitespace-nowrap">
                  <Button type="smallFormBtn">Add Brand</Button>
                </Link>
              </div>

              <div className="flex items-center justify-center">
                <Link to="/add-category" className="whitespace-nowrap">
                  <Button type="smallFormBtn">Add Category</Button>
                </Link>
              </div>

              <div className="flex items-center justify-center">
                <Link to="/add-color" className="whitespace-nowrap">
                  <Button type="smallFormBtn">Add Color</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
