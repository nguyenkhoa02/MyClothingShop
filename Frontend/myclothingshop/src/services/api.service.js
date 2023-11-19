import axios from "axios";
import {useAuthStore} from '@/stores/auth.store';



// const commonConfig = {
//
// };

export default (baseURL) => {
    // const authStore = useAuthStore();
    return axios.create({
        baseURL,
        headers: {
            // Authorization: `Bearer ${authStore.token}`,
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
};
