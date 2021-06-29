import { apiClient } from "./api";

export default {
  register(credentials) {
    return apiClient.post("/api/register", credentials);
  },
  login(credentials) {
    return apiClient.post("/api/login", credentials);
  },
};
