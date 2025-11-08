import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    staleTime: 0, // always fetch fresh data
    cacheTime: 0, // don’t cache old data
    refetchOnWindowFocus: true,
  });

  return {
    isLoading: authUser.isLoading,
    authUser: authUser.data?.user || null,
    refetch: authUser.refetch,
  };
};

export default useAuthUser;
