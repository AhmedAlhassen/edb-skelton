import axiosPrivate from "../api/axios";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axiosPrivate.post("/refresh", {
      withCredentials: true,
    });

    return response;
  };
  return refresh;
};

export default useRefreshToken;
