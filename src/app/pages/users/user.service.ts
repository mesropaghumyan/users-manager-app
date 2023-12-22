import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserInterface} from "./user.interface";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject<UserInterface[] | null>(null);

  public userDetails: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);

  private usersUrl: string = "https://657d98f13e3f5b189462cb9b.mockapi.io/api/v1/users/";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.usersUrl);
  }

  deleteById(id: number): Observable<UserInterface> {
    return this.http.delete<UserInterface>(this.usersUrl + id);
  }

  addUser(payload: UserInterface): Observable<UserInterface> {
    const body: HttpParams = new HttpParams()
      .set('name', payload.name)
      .set('email', payload.email)
      .set('password', payload.password)
      .set('occupation', payload.occupation)
      .set('bio', payload.bio);

    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<UserInterface>(this.usersUrl, body, { headers });
  }

  getById(id: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(this.usersUrl + id);
  }
}
