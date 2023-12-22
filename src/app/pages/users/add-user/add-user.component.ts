import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {UserInterface} from "../user.interface";

type AddUserFormGroupInterface = FormGroup<{
  name: FormControl<string | null>,
  email: FormControl<string | null>,
  password: FormControl<string | null>,
  occupation: FormControl<string | null>,
  bio: FormControl<string | null>,
}>;

const ADD_USER_FORM_VALIDATORS = {
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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserFormGroup: AddUserFormGroupInterface;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.addUserFormGroup = this.formBuilder.group(ADD_USER_FORM_VALIDATORS)
  }

  ngOnInit(): void {
    this.addUserFormGroup.valueChanges.subscribe((value: Partial<{name: string | null, email: string | null, password: string | null, occupation: string | null, bio: string | null}>): void => {
    });
  }

  onSubmitAddUser(): void {
    if (this.addUserFormGroup.valid && this.addUserFormGroup.value.name && this.addUserFormGroup.value.email && this.addUserFormGroup.value.password && this.addUserFormGroup.value.occupation && this.addUserFormGroup.value.bio) {
      const payload: UserInterface = {
        name: this.addUserFormGroup.value.name,
        email: this.addUserFormGroup.value.email,
        password: this.addUserFormGroup.value.password,
        occupation: this.addUserFormGroup.value.occupation,
        bio: this.addUserFormGroup.value.bio,
      }

      this.userService.addUser(payload).subscribe(
        (response) => {
          this.userService.users.value?.push(response);
          this.router.navigate(['/users']);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
