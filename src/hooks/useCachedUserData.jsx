import { useState, useEffect } from "react";

// 全域快取物件，key 為 URL，value 為回傳的資料
const globalCache = {};

function useCachedUserData(url) {
  const [data, setData] = useState(globalCache[url] || null);
  const [loading, setLoading] = useState(!globalCache[url]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    // 如果全域快取中已有資料，就直接使用，不再發送請求
    if (globalCache[url]) {
      setData(globalCache[url]);
      setLoading(false);
      return;
    }
    setLoading(true);

    async function fetchData() {
      try {
        const data = await fetch(url);
        const res = await data.json();
        globalCache[url] = res;
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}

export default useCachedUserData;
