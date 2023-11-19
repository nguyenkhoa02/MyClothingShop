import createApiClient from "./api.service";

class UserService {
    constructor(bareUrl = "/api/users") {
        this.api = createApiClient(bareUrl);
    }
    async userProfile() {
        const reponse = await this.api.get("/profile", {
            headers: {
                "x_authentications" :
            },
            body: JSON.stringify()
        })
    }
}


