import { useState, useEffect, useRef } from "react";

function useCachedUserData(url) {
  const cacheRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      // 若 cache 已有資料，就直接設定資料
      if (cacheRef.current) {
        setData(cacheRef.current);
        setLoading(false);
        return;
      }
      try {
        // 沒有 cache 的話，執行 fetch
        const res = await fetch(url);
        const data = await res.json();
        cacheRef.current = data;
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchUser();
  }, [url]);

  return { data, loading, error };
}

export default useCachedUserData;
