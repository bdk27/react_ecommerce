import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "@/assets/images/login_image.jpg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("帳號或密碼不得為空");
      return;
    }
    if (username !== "abc123") {
      setError("帳號錯誤");
      setUsername("");
      return;
    }
    if (password !== "123456") {
      setError("密碼錯誤");
      setPassword("");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  }

  return (
    <div>
      <h1 className="mb-3 text-xl font-bold">登入</h1>
      <div className="flex flex-col items-start gap-5 md:flex-row md:gap-10">
        <div className="hidden md:block md:w-1/2">
          <img src={loginImage} alt="loginImage" />
        </div>

        <form
          className="flex flex-col w-full gap-3 md:w-1/2"
          onSubmit={handleLogin}
        >
          <label htmlFor="username">帳號: (abc123)</label>
          <input
            type="text"
            placeholder="Username"
            className="p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">密碼: (123456)</label>
          <input
            type="password"
            placeholder="Password"
            className="p-2"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="py-2 mt-5 text-white transition duration-300 ease-in-out bg-black border border-black rounded hover:border-black hover:bg-transparent hover:text-black *:"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
