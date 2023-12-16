import { Injectable } from '@angular/core';
import {UserInterface} from "../interfaces/user.interface";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {LocalService} from "./local.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private usersUrl: string = "https://657d98f13e3f5b189462cb9b.mockapi.io/api/v1/users";

  constructor(private http: HttpClient, private localService: LocalService) { }

  register(payload: UserInterface): Observable<any> {
    const body: HttpParams = new HttpParams()
      .set('name', payload.name)
      .set('email', payload.email)
      .set('password', payload.password)
      .set('occupation', payload.occupation)
      .set('bio', payload.bio);

    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<UserInterface>(this.usersUrl, body, { headers }).pipe(
      map((response: UserInterface) => {
        if (response) {
          this.localService.saveData('user', JSON.stringify(response));

          return response;
        } else {
          throw new Error('Internal Server Error');
        }
      })
    );
  }
}
