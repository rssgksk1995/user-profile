import axios from 'axios';
import { API_ROOT} from "@/config";

export default {
  fetchUserData() {
    const url = `${API_ROOT}/userProfile`;
    return axios.get(url);
  },
  addUserData(data){
    const url = `${API_ROOT}/userProfile/`;
    return axios.post(url, data);
  }
 
};

// page=2
