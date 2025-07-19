import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

import { UserIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="bg-white">
      {/* Mobile menu */}

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex items-center lg:ml-0">
                <Link to="/" className="flex items-center space-x-2">
                  <img alt="" src="" className="h-10 w-auto" />
                  <p className="font-bold text-lg">RivanShop</p>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                {isAuthenticated ? (
                  <div className="ml-4 flex items-center space-x-4 lg:ml-6 gap-5">
                    <Link
                      to="/cart"
                      className="group -m-2 flex items-center p-2"
                    >
                      <ShoppingBagIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </Link>

                    {/* profile */}
                    <Link
                      to="/profile"
                      className="group -m-2 flex items-center p-2"
                    >
                      <UserIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </Link>
                  </div>
                ) : (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                    <Link
                      to="/register"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
