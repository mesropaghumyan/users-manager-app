import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {UserInterface} from "../../interfaces/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../services/user.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

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
  public users: UserInterface[] | null = null;
  public usersSubscription!: Subscription;

  constructor(private userService: UserService, private liveAnnouncer: LiveAnnouncer, private router: Router, private authService: AuthService) {
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
    this.usersSubscription = this.userService.users.subscribe(
      users => this.users = users
    );

    this.dataSource.filterPredicate = function (data: UserInterface, filter: string): boolean {
      return data.email.toLowerCase().includes(filter) || data.occupation.toLowerCase().includes(filter) || data.name.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
