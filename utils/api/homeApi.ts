import { toast } from "sonner";
import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";
import { HomeApiResponseData } from "@/utils/types/home";

export const fetchHomeData = async () => {
  const resp = await apiClient<HomeApiResponseData>(API_ENDPOINTS.HOME);
  toast.success("Home data fetched successfully");

  return resp;
};
