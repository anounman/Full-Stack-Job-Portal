import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (callBack, options = {}) => {
  const { session } = useSession();
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseAccessToken = await session.getToken({
        template: "supabase",
      });

      const response = await callBack(supabaseAccessToken, options, ...args);
      setData(response);

      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { fn, data, loading, error };
};

export default useFetch;
