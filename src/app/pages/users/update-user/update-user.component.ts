import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInterface} from "../user.interface";
import {UserService} from "../user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userId!: string;
  updateUser!: UserInterface;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (this.userId) {
      this.userService.getById(this.userId).subscribe(
        (response) => {
          this.updateUser = response;
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
