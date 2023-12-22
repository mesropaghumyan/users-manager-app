import {Component, OnInit} from '@angular/core';
import {LocalService} from "./services/local.service";
import {Subscription} from "rxjs";
import {AuthService} from "./pages/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin: boolean = false;

  isLoginSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.isLoginSubscription = this.authService.isLogin.subscribe(
      (response) => {
        this.isLogin = response;
      }
    );
  }
}
