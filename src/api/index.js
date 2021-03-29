import axios from 'axios';
import { API_ROOT} from "@/config";

export default {
  fetchUserData(params) {
    const url = `${API_ROOT}/api/users?${params}/`;
    return axios.get(url);
  },
 
};

// page=2
