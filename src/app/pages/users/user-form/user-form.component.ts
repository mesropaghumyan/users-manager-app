import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserInterface} from "../user.interface";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input({required: true}) mode!: 'add' | 'update';
  @Input({required: false}) id!: string;

  @Input({required: false}) user!: UserInterface;

  public title!: string;
  public btnTitle!: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    switch (this.mode) {
      case ("update"):
        this.title = "Update user";
        this.btnTitle = "Update";
        break;
      case ("add"):
        this.title = "Add user";
        this.user = this.userService.initializeEmptyUser();
        this.btnTitle = "Add";
    }
  }

  onSubmitUserForm(f: NgForm): void {
    if (f.valid) {
      switch (this.mode) {
        case ("update"):
          this.userService.updateUser(this.id, this.user).subscribe(
            (response) => {
              const updatedUsers = this.userService.users.value ? [...this.userService.users.value] : [];
              const index = updatedUsers.findIndex(u => u.id === this.id);
              if (index !== -1) {
                updatedUsers[index] = response;
                this.userService.users.next(updatedUsers);
                this.router.navigate(['/']);
                // TODO: Redirect to error page
              }
            },
            (error) => {
              console.log(error);
            }
          )
          break;
        case ("add"):
          this.user = this.userService.mapperUser(f.value);
          this.userService.addUser(this.user).subscribe(
            (response) => {
              const updatedUsers: UserInterface[] = [...(this.userService.users.value || []), response];
              this.userService.users.next(updatedUsers);
              this.router.navigate(['/']);
              // TODO: Redirect to successfully page
            },
            (error) => {
              console.log(error);
            }
          )
          break;
      }
    }
  }
}
