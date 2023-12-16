import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {LocalService} from "./local.service";
import {UserInterface} from "../interfaces/user.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl: string = "https://657d98f13e3f5b189462cb9b.mockapi.io/api/v1/users";

  public authUser: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);

  public isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private localService: LocalService, private router: Router) {
    const isAuth: boolean = this.localService.checkData('user');

    if (isAuth) {
      const localDataString: string | null = this.localService.getData('user');

      if (localDataString) {
        const localData: UserInterface = JSON.parse(localDataString);

        const user: UserInterface = {
          id: localData.id,
          name: localData.name || '',
          email: localData.email || '',
          password: localData.password || '',
          occupation: localData.occupation || '',
          bio: localData.bio || ''
        };

        this.authUser.next(user);
        this.isLogin.next(true);
      }
    }
  }

  public logout(): void {
    this.localService.clearData();
    this.isLogin.next(false);
    this.router.navigate(['/login'])
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((users: UserInterface[]) => {
        const user: UserInterface | undefined = users.find(u => u.email === email && u.password === password);

        if (user) {
          this.localService.saveData('user', JSON.stringify(user));
          this.authUser.next(user);
          this.isLogin.next(true);
          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }
}
