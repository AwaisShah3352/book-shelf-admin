import {Component, OnInit} from '@angular/core';
import {DataCollectorService} from '../../services/data-collector.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  allReports: any = [];
  Reports: any = [];

  constructor(public dataCollector: DataCollectorService,
              public router: Router) {
  }

  ngOnInit(): void {
    var isloggedIn = localStorage.getItem('isLoggedIn');
    if(isloggedIn === 'true'){
      this.dataCollector.getAllReports();
      this.loadReports();
    } else if(isloggedIn === null) {
      this.router.navigate(['']);
      alert('You are not logged in. Please login first...');
    }
  }

  loadReports(): any {
    this.dataCollector.getReportsValue().subscribe((data: any) => {
      this.Reports = this.dataCollector.reports;
      this.allReports = [];
      if (this.Reports.length > 0) {
        for (let i = 0; i < this.Reports.length; i++) {
          for (const reportsKey in this.Reports[i]) {
            const newReportObj: any = this.Reports[i][`${reportsKey}`];
            this.allReports.push(newReportObj);
            console.log('new obj', newReportObj);
            console.log('key', reportsKey);
          }
        }
      }
      this.Reports = [];
      this.Reports = this.allReports;
      this.allReports = [];
      console.log(`Reports`, this.Reports);
    });
  }

}
