import { Component, OnInit } from '@angular/core';
import {DataCollectorService} from '../../services/data-collector.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  opened = false;
  data;
  users: any = [];
  constructor(public dataCollector: DataCollectorService) {
    this.dataCollector.getAllUsers();
    this.loadUsers();
    setTimeout(() => {
      // this.loadUsers();
    }, 5000);
  }

  ngOnInit(): void {
  }

  loadUsers(): any {
    this.dataCollector.getValue().subscribe((data: any) => {
      this.users = this.dataCollector.users;
    });
  }
}
