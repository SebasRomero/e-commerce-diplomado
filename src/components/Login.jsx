import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "./functions/functions";
import { useAuth } from "../providers/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const onSubmit = async (data) => {
    const body = {
      email: data.Email,
      password: data.Password,
    };

    try {
      const responseReq = await fetch(
        "https://backend-diplom.fly.dev/auth/login",
        {
          body: JSON.stringify(body),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await responseReq.json();
      login(response.access_token)
      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
      if (isAdmin(response.user.roles)) {
        navigate("/admin-panel");
        window.location.reload();
      } else {
        navigate("/product");
        window.location.reload();
      }
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center pt-[10%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center bg-gray-900 py-24 w-[15%]"
      >
        <h2 className="text-white">Login</h2>
        <div className="py-10">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Email"
            {...register("Email", { required: true })}
          />
        </div>
        <div>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            {...register("Password", {
              required: true,
            })}
          />
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
