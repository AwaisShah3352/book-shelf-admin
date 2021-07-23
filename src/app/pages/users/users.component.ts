import { Component, OnInit } from '@angular/core';
import {DataCollectorService} from '../../services/data-collector.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  opened = false;
  data;
  users: any = [];
  constructor(public dataCollector: DataCollectorService,
              public router: Router) {
  }

  ngOnInit(): void {
    var isloggedIn = localStorage.getItem('isLoggedIn');
    if(isloggedIn === 'true'){
      this.dataCollector.getAllUsers();
      this.loadUsers();
    } else if(isloggedIn === null) {
      this.router.navigate(['']);
      alert('You are not logged in. Please login first...');
    }
  }

  loadUsers(): any {
    this.dataCollector.getValue().subscribe((data: any) => {
      this.users = this.dataCollector.users;
    });
  }
}
