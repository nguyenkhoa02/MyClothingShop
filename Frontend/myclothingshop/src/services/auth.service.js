import createApiClient from "./api.service";

class AuthService {
    constructor(bareUrl = "api/authentication") {
        this.api = createApiClient(bareUrl)
    }

    async Login(payload) {
        return (await this.api.post("/login", payload));
    }

    async SignUp(payload) {
        return (await this.api.post('/register', payload));
    }

    async checkAuth () {
        try {
            let res = await this.api.get('/user');
            if (res) {
                return res;
            }
        }
        catch (e) {
            console.log(e);
        }
        return false;
    }

    async logout() {
        try {
            let res = await this.api.get('/logout');
            if (res) {
                return true;
            }
        }
        catch (e) {
            console.log(e);
        }
        return false;
    }
}

export default new AuthService();