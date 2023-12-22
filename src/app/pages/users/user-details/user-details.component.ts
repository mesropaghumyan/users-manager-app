import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserInterface} from "../user.interface";
import {Subscription} from "rxjs";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;

  userDetailsSubscription!: Subscription;
  userDetails: UserInterface | null = null;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.userDetailsSubscription = this.userService.userDetails.subscribe(
      userDetails => this.userDetails = userDetails
    );

    if (this.userId) {
      this.userService.getById(this.userId).subscribe(
        (response) => {
          this.userService.userDetails.next(response);
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
}
