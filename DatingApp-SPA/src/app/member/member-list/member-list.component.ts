import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/Pagination';


@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem("user"));
  genderList = [
    { value: "male", display: "Males" },
    { value: "female", display: "Females" }
  ];
  userParam: any = {};

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });

    this.userParam.minAge = 18;
    this.userParam.maxAge = 99;
    this.userParam.gender = this.user.gender === "female" ? "male" : "female";
  }

  resetFilters() {
    this.userParam.minAge = 18;
    this.userParam.maxAge = 99;
    this.userParam.gender = this.user.gender === "female" ? "male" : "female";
    this.userParam.orderBy = 'lastActive';
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log("event");
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParam
      )
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
}
