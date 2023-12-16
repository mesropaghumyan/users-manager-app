import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserInterface} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: BehaviorSubject<UserInterface[] | null> = new BehaviorSubject<UserInterface[] | null>(null);

  private usersUrl: string = "https://657d98f13e3f5b189462cb9b.mockapi.io/api/v1/users";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.usersUrl);
  }
}
