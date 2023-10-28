import createApiClient from "./api.service";
import { authHeader } from "@/helpers/auth-header";
import {handleError} from "vue";

class UserService {
    constructor(bareUrl = "/api/users") {
        this.api = createApiClient(bareUrl);
    }

    async signIn() {
        return (
            await this.api.post("/signin")
                .then(handleResponse)
                .then(user => {
                    if(user.token) {
                        localStorage.setItem('user', JSON.stringify(user))
                    }

                    return user;
                })
        )
    }



}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // tự động logout nếu response 401 được trả về từ api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}