import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/core/service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ["", [Validators.email, Validators.required]],
    password: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  login(value: { email: string; password: string }) {
    const isAuthorized = this.authService.authorize(value);
    if (isAuthorized) {
      this.toastr.success("Login Successful", "Success");
      setTimeout(() => {
        this.router.navigate(["/home"]);
      }, 1500);
    }
    else{
      this.toastr.error("Login Failed" , "Email or Password is incorrect");
    }
  }
}
