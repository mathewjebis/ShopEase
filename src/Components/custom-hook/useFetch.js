import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(URL) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setError("");
        const response = await axios.get(URL);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApi();
  }, [URL]);

  return { products, error, isLoading, setProducts };
}

export default useFetch;
