import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { UserInterface } from "./user.interface";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['name', 'email', 'occupation', 'actions'];
  public dataSource: MatTableDataSource<UserInterface> = new MatTableDataSource<UserInterface>([]);
  public usersSubscription!: Subscription;
  public filterOptions: string[] = ['all', 'name', 'email', 'occupation'];
  public selectedFilterOption: string = 'all';

  constructor(
    private userService: UserService,
    private liveAnnouncer: LiveAnnouncer,
    private authService: AuthService
  )
  {
    this.userService.getAllUsers().subscribe(
      (response: UserInterface[]): void => {
        this.userService.users.next(response);
        this.dataSource.data = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.usersSubscription = this.userService.getAllUsers().subscribe(
      (response: UserInterface[]) => {
        this.dataSource = new MatTableDataSource<UserInterface>(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.setupFilterPredicate();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private setupFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: UserInterface, filter: string) => {
      switch (this.selectedFilterOption) {
        case 'name':
          return data.name.toLowerCase().includes(filter);
        case 'email':
          return data.email.toLowerCase().includes(filter);
        case 'occupation':
          return data.occupation.toLowerCase().includes(filter);
        default:
          return JSON.stringify(data).toLowerCase().includes(filter);
      }
    };
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    }
    else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }


  onSelectFilterOption(event: Event) {
    this.selectedFilterOption = (event.target as HTMLSelectElement).value;
  }

  onDelete(id: number): void {
    this.userService.deleteById(id).subscribe(
      (response: UserInterface): void => {
        const users = this.userService.users.value ?? [];
        const index = users.findIndex((user: UserInterface) => user.id === String(id));

        if (index !== -1) {
          users.splice(index, 1);
        }

        this.userService.users.next(users);
        this.dataSource.data = users;

        if (this.authService.authUser.value && this.authService.authUser.value.id === String(id)) {
          this.authService.logout();
        }
      },
      (error): void => {
        console.log(error);
      }
    )

  }

}
