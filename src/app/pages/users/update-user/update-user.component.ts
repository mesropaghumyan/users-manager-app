import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInterface} from "../user.interface";
import {Subscription} from "rxjs";

type UpdateFormGroupInterface = FormGroup<{
  name: FormControl<string | null>,
  email: FormControl<string | null>,
  password: FormControl<string | null>,
  occupation: FormControl<string | null>,
  bio: FormControl<string | null>,
}>;

const UPDATE_FORM_VALIDATORS = {
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
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userId: string | null = null;
  updateFormGroup: UpdateFormGroupInterface;
  userUpdate: UserInterface | null = null;
  userUpdateSubscription!: Subscription;

  name: string | undefined = "";
  email: string | undefined = "";
  password: string | undefined = "";
  occupation: string | undefined = "";
  bio: string | undefined = "";

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    this.updateFormGroup = this.formBuilder.group(UPDATE_FORM_VALIDATORS)
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.updateFormGroup.valueChanges.subscribe((value: Partial<{name: string | null, email: string | null, password: string | null, occupation: string | null, bio: string | null}>): void => {
    });
  }

  onSubmitUpdateForm(): void {

  }
}
