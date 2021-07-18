import {Component, OnInit} from '@angular/core';
import {DataCollectorService} from '../../services/data-collector.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  totalStars = 0;
  totalRating = 0;
  Reviews: any = [];
  allReviews: any = [];

  constructor(public dataCollector: DataCollectorService) {
    this.dataCollector.getAllReviews();
    this.loadReviews();
  }

  ngOnInit(): void {
  }

  loadReviews(): any {
    this.dataCollector.getReviewsValue().subscribe((data: any) => {
      this.Reviews = this.dataCollector.reviews;
      this.allReviews = [];
      if (this.Reviews.length > 0) {
        for (let i = 0; i < this.Reviews.length; i++) {
          for (const ReviewsKey in this.Reviews[i]) {
            const newReviewObj: any = this.Reviews[i][`${ReviewsKey}`];
            this.totalStars = this.totalStars + newReviewObj.stars;
            this.allReviews.push(newReviewObj);
            console.log('new obj', newReviewObj);
            console.log('key', ReviewsKey);
          }
        }
      }
      this.Reviews = [];
      this.Reviews = this.allReviews;
      this.allReviews = [];
      this.totalRating = this.totalStars / this.Reviews.length;
      console.log('reviews', this.Reviews);
    });
  }
}
