import { UserModel } from "../models/UserModel";

class AuthenticationService {
  public static saveToken(token: string) {
    return sessionStorage.setItem('token', token);
  }

  public static getToken() {
    return sessionStorage.getItem('token');
  }

  public static removeToken() {
    return sessionStorage.removeItem('token');
  }

  public static saveUser(user: UserModel) {
    return sessionStorage.setItem('user', JSON.stringify(user));
  }

  public static getUser(): UserModel {
    return JSON.parse(sessionStorage.getItem('user') || "{}");
  }

  public static removeUser() {
    return sessionStorage.removeItem('user');
  }

  public static logout() {
    this.removeToken();
    this.removeUser();
  }
}

export { AuthenticationService }