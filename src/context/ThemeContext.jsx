import { createContext, useState, useEffect, useContext } from "react";

// 建立 ThemeContext
const ThemeContext = createContext();

// ThemeProvider 負責提供主題狀態
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // 切換主題函式
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自訂 Hook 讓組件可以使用 ThemeContext
export const useTheme = () => useContext(ThemeContext);
