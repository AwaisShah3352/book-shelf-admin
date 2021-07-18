import {Component, OnInit} from '@angular/core';
import {tsXLXS} from 'ts-xlsx-export';
import {DataCollectorService} from '../services/data-collector.service';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  opened = false;
  data;
  users: any = [];
  constructor(public dataCollector: DataCollectorService,
              public router: Router) {
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

  openUsers(): any {
    this.router.navigate(['/users']);
  }


  openBooks(): any {
    this.router.navigate(['/books']);
  }

  openHelpDesk(): any {
    this.router.navigate(['/help-desk']);
  }

  openReviews(): any {
    this.router.navigate(['/reviews']);
  }

  openReports(): any {
    this.router.navigate(['/reports']);
  }

  openProfile(): any {
    this.router.navigate(['/profile']);
  }
}
