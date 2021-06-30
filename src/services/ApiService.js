import { apiClient } from "./api";
export default {
  getApilist() {
    return apiClient.get("api/list");
  },
  fetchOneApilist(apilist_id, student_id) {
    return apiClient.get("api/list/" + apilist_id + "/" + student_id);
  },
  updateApilist(payload) {
    return apiClient.put("api/list/" + payload.apilist.id, payload.apilist);
  },
  postApilist(payload) {
    return apiClient.post("api/list", payload.apilist);
  },
  deleteApilist(payload) {
    return apiClient.delete("api/list/" + payload.apilist.id);
  }
};
