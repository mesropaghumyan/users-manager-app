import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {LocalService} from "./local.service";
import {UserInterface} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl: string = "https://657d98f13e3f5b189462cb9b.mockapi.io/api/v1/users";

  constructor(private http: HttpClient, private localService: LocalService) {}

  public login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((users: UserInterface[]) => {
        const user: UserInterface | undefined = users.find(u => u.email === email && u.password === password);

        if (user) {
          this.localService.saveData('user', JSON.stringify(user));

          return user;
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }
}
