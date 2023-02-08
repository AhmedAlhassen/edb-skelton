import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [controller, setController] = useState();

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    console.log({ ...requestConfig });
    setData([]);
    setError("");
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      console.log(res);
      setResponse(res);
      setData(res.data);
    } catch (err) {
      if (err.response.status === 401) {
        console.log("refresh fiald");

        setAuth({});

        navigate("/login");
      }
      console.log(err);
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(controller);

    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  console.log("axios", error, data);
  return [response, data, error, loading, axiosFetch];
};

export default useAxiosFunction;
