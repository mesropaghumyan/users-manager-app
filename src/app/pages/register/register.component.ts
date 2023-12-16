import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";
import {UserInterface} from "../../interfaces/user.interface";

type RegisterFormGroupInterface = FormGroup<{
  name: FormControl<string | null>,
  email: FormControl<string | null>,
  password: FormControl<string | null>,
  occupation: FormControl<string | null>,
  bio: FormControl<string | null>,
}>;

const REGISTER_FORM_VALIDATORS = {
  name: [null as unknown as string, [
    Validators.required,
  ]],
  email: [null as unknown as string, [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ]],
  password: [null as unknown as string, [
    Validators.required,
    Validators.minLength(8)
  ]],
  occupation: [null as unknown as string, [
    Validators.required,
  ]],
  bio: [null as unknown as string, [
    Validators.required,
  ]],
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: RegisterFormGroupInterface;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerFormGroup = this.formBuilder.group(REGISTER_FORM_VALIDATORS)
  }

  ngOnInit(): void {
    this.registerFormGroup.valueChanges.subscribe((value: Partial<{name: string | null, email: string | null, password: string | null, occupation: string | null, bio: string | null}>): void => {
    });
  }

  onSubmitRegisterForm(): void {
    if (this.registerFormGroup.valid && this.registerFormGroup.value.name && this.registerFormGroup.value.email && this.registerFormGroup.value.password && this.registerFormGroup.value.occupation && this.registerFormGroup.value.bio) {
      const payload: UserInterface = {
        name: this.registerFormGroup.value.name,
        email: this.registerFormGroup.value.email,
        password: this.registerFormGroup.value.password,
        occupation: this.registerFormGroup.value.occupation,
        bio: this.registerFormGroup.value.bio,
      };

      this.registerService.register(payload).subscribe(
        (response) => {
          this.router.navigate(['/users'])
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
