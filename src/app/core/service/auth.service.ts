import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}
  adminLogin: { email: string; password: string } = {
    email: "admin@admin.com",
    password: "fuck u",
  };
  loginSuccess: boolean = false;

  isAuthenticated(): boolean {
    return sessionStorage.getItem("authenticated") === "true";
  }

  authorize(value: { email: string; password: string }): boolean {
    sessionStorage.setItem("authenticated", value.email === this.adminLogin.email && value.password === this.adminLogin.password ? "true" : "false");
    return value.email === this.adminLogin.email && value.password === this.adminLogin.password;
  }
}
