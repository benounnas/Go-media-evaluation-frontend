import { apiClient } from "./api";
export default {
  getTransactions() {
    return apiClient.get("api/transactions");
  }
};
