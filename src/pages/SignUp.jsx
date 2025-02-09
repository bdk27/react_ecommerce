import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import CryptoJS from "crypto-js";
import signupImage from "@/assets/images/signup_image.jpg";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("帳號或密碼不得為空");
      return;
    }

    const encryptedUsername = CryptoJS.AES.encrypt(
      username,
      "secret key 123"
    ).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      "secret key 123"
    ).toString();

    localStorage.setItem("username", encryptedUsername);
    localStorage.setItem("password", encryptedPassword);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/login");
  }

  function loginAccount() {
    navigate("/login");
  }

  return (
    <>
      <div className="flex flex-col items-start gap-5 md:flex-row md:gap-10">
        <div className="w-full md:w-1/2">
          <h1 className="mb-3 text-2xl font-bold">註冊</h1>
          <h2 className="text-md text-grey-dark text-bold">享受最佳體驗</h2>
          <p className="mb-3 text-sm text-grey-dark">
            登入即可享受個人化體驗並存取我們的所有服務。
          </p>
          <form className="flex flex-col w-full gap-3" onSubmit={handleSignUp}>
            <label htmlFor="username">帳號:</label>
            <input
              type="text"
              placeholder="Username"
              className="p-2"
              value={username}
              autoComplete="current-username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">密碼:</label>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={isShowPassword ? faEyeSlash : faEye}
                className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="py-2 mt-5 text-white transition duration-300 ease-in-out bg-black border border-black md:rounded hover:border-black hover:bg-transparent hover:text-black"
            >
              註冊
            </button>
            <p className="text-center cursor-pointer" onClick={loginAccount}>
              已有帳戶嗎? 立即登入
            </p>
          </form>
        </div>
        <div className="flex flex-col items-start gap-5 md:flex-row md:gap-10 md:w-1/2">
          <div className="hidden md:block">
            <img src={signupImage} alt="signupImage" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
