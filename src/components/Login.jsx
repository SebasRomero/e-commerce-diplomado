import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "./functions/functions";
import { useAuth } from "../providers/AuthContext";
import { host } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState(""); // State to capture login error
  const { login } = useAuth();

const onSubmit = async (data) => {
  const body = {
    email: data.Email,
    password: data.Password,
  };

  try {
    const responseReq = await fetch(`${host}auth/login`, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await responseReq.json();
    console.log(response)

    if (response.access_token) {
      // Pass user data to the login function
      login(response.access_token, response.user);
      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      // You can remove the window.location.reload() to avoid the unwanted reload
      if (isAdmin(response.user.roles)) {
        navigate("/admin-panel/product");
      } else {
        navigate("/product");
      }
    } else {
      // Handle login error
      setLoginError("Invalid email or password. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    setLoginError("An error occurred during login. Please try again later.");
  }
};


  return (
    <div className="flex items-center justify-center pt-[10%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center bg-gray-900 py-24 w-[15%]"
      >
        <h2 className="text-white">Login</h2>

        {/* Display login error in red */}
        {loginError && <p className="text-red-500">{loginError}</p>}

        <div className="py-10">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Email"
            {...register("Email", { required: "Email is required" })}
          />
          {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            {...register("Password", { required: "Password is required" })}
          />
          {errors.Password && <p className="text-red-500">{errors.Password.message}</p>}
        </div>

        <div className="pt-10">
          <button className="text-white w-32 h-10 bg-orange-500" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
