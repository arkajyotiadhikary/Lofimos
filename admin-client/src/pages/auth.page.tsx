import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserData, UserResponseData } from "../types";
import { signIn } from "../services/authServices";
import { AuthContext } from "../contexts/AuthContext"; // Import the authentication context

import logo from "../public/logo/wepik-export-20240324130518XYcX.png";

const Auth = () => {
      const navigate = useNavigate();
      const [userData, setUserData] = useState<UserData>({
            email: "",
            password: "",
      });

      const authContext = useContext(AuthContext); // Get the authentication context

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                  console.log("btn pressed", userData);
                  const response: UserResponseData | undefined = await signIn(userData);
                  if (response) {
                        console.log("signed in auth context", authContext.user);
                        console.log("signed in response", response);
                        authContext.setUser(response);
                        // navigate("/songs");
                  }
            } catch (error) {
                  console.log(error);
            }
      };

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setUserData((prev) => ({ ...prev, [name]: value }));
      };

      // TODO error message display
      return (
            <div className="Auth">
                  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                              <img className="mx-auto h-10 w-auto" src={logo} alt="Lofimos" />
                              <div className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                          <span className="block">Administrator Login</span>
                                          <span className="text-sm font-normal">
                                                Please log in to access the administrator features
                                          </span>
                                    </h2>
                              </div>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                              <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                          <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                          >
                                                Email address
                                          </label>
                                          <div className="mt-2">
                                                <input
                                                      id="email"
                                                      name="email"
                                                      type="email"
                                                      autoComplete="email"
                                                      value={userData.email}
                                                      onChange={handleChange}
                                                      required
                                                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                          </div>
                                    </div>

                                    <div>
                                          <div className="flex items-center justify-between">
                                                <label
                                                      htmlFor="password"
                                                      className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                      Password
                                                </label>
                                                <div className="text-sm">
                                                      <a
                                                            href="#"
                                                            className="font-semibold text-black hover:text-indigo-500"
                                                      >
                                                            Forgot password?
                                                      </a>
                                                </div>
                                          </div>
                                          <div className="mt-2">
                                                <input
                                                      id="password"
                                                      name="password"
                                                      type="password"
                                                      autoComplete="current-password"
                                                      value={userData.password}
                                                      onChange={handleChange}
                                                      required
                                                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                          </div>
                                    </div>

                                    <div>
                                          <button
                                                type="submit"
                                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                          >
                                                Sign in
                                          </button>
                                    </div>
                              </form>
                        </div>
                  </div>
            </div>
      );
};

export default Auth;
