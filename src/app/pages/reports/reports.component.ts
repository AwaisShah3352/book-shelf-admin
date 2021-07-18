import {Component, OnInit} from '@angular/core';
import {DataCollectorService} from '../../services/data-collector.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  allReports: any = [];
  Reports: any = [];

  constructor(public dataCollector: DataCollectorService) {
    this.dataCollector.getAllReports();
    this.loadReports();
  }

  ngOnInit(): void {
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
