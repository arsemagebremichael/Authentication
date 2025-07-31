import { useEffect, useState, useCallback } from "react";
import { fetchProducts } from "../utils/fetchCatalogueProducts";

export const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchProducts(); 
      setProducts(result);
    } catch (error) {
      setError(error.message ?? "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { loading, error, products, setProducts, refetch };
};