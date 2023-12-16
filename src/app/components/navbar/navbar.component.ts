import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  id: string | null = null;
  name: string | null = null;
  dropdownStatus: boolean = false;
  mobileBtnStatus: boolean = false;

  constructor(private authService: AuthService) {
  }

  onClickDropdown(): void {
    this.dropdownStatus = !this.dropdownStatus;
  }

  onClickMobileBtn() {
    this.mobileBtnStatus = !this.mobileBtnStatus;
  }

  onLogout() {
    this.authService.logout();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() : void {
    if (window.innerWidth > 768) {
      this.dropdownStatus = false;
      this.mobileBtnStatus = false;
    }
  }

  ngOnInit(): void {
    const authUser = this.authService.authUser.value;
    console.log(authUser);
    if (authUser && authUser.name !== undefined && authUser.id !== undefined) {
      this.name = authUser.name;
      this.id = authUser.id;
    }
  }
}
