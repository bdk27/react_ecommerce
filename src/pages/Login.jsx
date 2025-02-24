import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import CryptoJS from "crypto-js";
import loginImage from "@/assets/images/login_image.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const encryptedUsername = localStorage.getItem("username");
  const encryptedPassword = localStorage.getItem("password");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("帳號或密碼不得為空");
      return;
    }

    if (!encryptedUsername || !encryptedPassword) {
      setError("帳號或密碼未註冊過");
      setUsername("");
      setPassword("");
      return;
    }

    const decryptedUsername = CryptoJS.AES.decrypt(
      encryptedUsername,
      "secret key 123"
    ).toString(CryptoJS.enc.Utf8);
    const decryptedPassword = CryptoJS.AES.decrypt(
      encryptedPassword,
      "secret key 123"
    ).toString(CryptoJS.enc.Utf8);

    if (username !== decryptedUsername || password !== decryptedPassword) {
      setError("帳號或密碼錯誤");
      setUsername("");
      setPassword("");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  }

  function handleNavigation(path) {
    switch (path) {
      case "/signup":
        navigate("/signup");
        break;
      case "/login":
        const confirmed = window.confirm("確定要登出嗎?");
        if (confirmed) {
          localStorage.removeItem("isLoggedIn");
          window.dispatchEvent(new Event("storage"));
          navigate("/login");
        }
        break;
      default:
        navigate("/");
    }
  }

  if (localStorage.getItem("isLoggedIn") === "true") {
    const decryptedUsername = CryptoJS.AES.decrypt(
      encryptedUsername,
      "secret key 123"
    ).toString(CryptoJS.enc.Utf8);
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 lg:gap-5">
        <FontAwesomeIcon
          icon={faFaceSmileBeam}
          className="fa-5x text-grey-dark"
        />
        <h2 className="text-xl font-bold">
          Hi, {decryptedUsername} 請享受購物吧!
        </h2>
        <div>
          <button
            className="px-5 py-2 text-sm text-white bg-black rounded md:text-md lg:text-lg"
            onClick={() => handleNavigation("/")}
          >
            前往購物
          </button>
          <button
            className="px-5 py-2 ml-3 text-sm transition duration-300 ease-in-out border border-black rounded md:text-md lg:text-lg hover:bg-black hover:text-white"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.dispatchEvent(new Event("storage"));
              handleNavigation("/login");
            }}
          >
            登出
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-5 md:flex-row md:gap-10">
      <div className="hidden md:block md:w-1/2">
        <img src={loginImage} alt="loginImage" />
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="mb-3 text-2xl font-bold">登入</h1>
        <h2 className="text-md text-grey-dark text-bold">享受最佳體驗</h2>
        <p className="mb-3 text-sm text-grey-dark">
          登入即可享受個人化體驗並存取我們的所有服務。
        </p>
        <form className="flex flex-col w-full gap-3 " onSubmit={handleLogin}>
          <label htmlFor="username">帳號:</label>
          <input
            type="text"
            placeholder="Username"
            className="p-2 text-black"
            value={username}
            autoComplete="current-username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">密碼:</label>
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 text-black"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={isShowPassword ? faEyeSlash : faEye}
              className="absolute text-black transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="py-2 mt-5 text-white transition duration-300 ease-in-out bg-black border border-black md:rounded hover:border-black hover:bg-transparent hover:text-black"
          >
            登入
          </button>
          <p
            className="text-center cursor-pointer"
            onClick={() => handleNavigation("/signup")}
          >
            還沒有帳戶嗎? 立即註冊
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
