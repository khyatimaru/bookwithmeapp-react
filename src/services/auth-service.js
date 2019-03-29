import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';

class AuthService {

    tokenKey = 'auth_token';

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    decode(token) {
        return jwt.decode(token);
    }

    saveToken(token) {
        return localStorage.setItem(this.tokenKey, token);
    }

    invalidateUser() {
        localStorage.removeItem(this.tokenKey);
    }

    getExpiration(token) {
        const exp = this.decode(token).exp;
        return moment.unix(exp);
    }

    isValid(token) {
        return moment().isBefore(this.getExpiration(token));

    }
    isAuthenticated() {
        const token = this.getToken();
        return (token && this.isValid(token)) ? true : false;
    }
    getUsername() {
        return this.decode(this.getToken()).username;
    }
}

export default new AuthService();