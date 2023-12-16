import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

type LoginFormGroupInterface = FormGroup<{
  email: FormControl<string | null>,
  password: FormControl<string | null>
}>;

const LOGIN_FORM_VALIDATORS = {
  email: [null as unknown as string, [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ]],
  password: [null as unknown as string, [
    Validators.required
  ]]
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: LoginFormGroupInterface;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginFormGroup = this.formBuilder.group(LOGIN_FORM_VALIDATORS)
  }


  ngOnInit(): void {
    this.loginFormGroup.valueChanges.subscribe((value: Partial<{email: string | null, password: string | null}>): void => {
    });
  }

  onSubmitLoginForm(): void {
    if (this.loginFormGroup.valid && this.loginFormGroup.value.email && this.loginFormGroup.value.password) {
      this.authService.login(this.loginFormGroup.value.email, this.loginFormGroup.value.password).subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['/users'])
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
