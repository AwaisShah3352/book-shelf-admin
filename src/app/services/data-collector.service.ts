import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataCollectorService {

  users: any = [];
  books: any = [];
  requiredBooks: any = [];
  donatedBooks: any = [];
  reviews: any = [];
  reports: any = [];
  usersCollection: BehaviorSubject<any>;
  booksCollection: BehaviorSubject<any>;
  reviewsCollection: BehaviorSubject<any>;
  reportsCollection: BehaviorSubject<any>;

  constructor() {
    this.usersCollection = new BehaviorSubject<any>('data');
    this.booksCollection = new BehaviorSubject<any>('data');
    this.reviewsCollection = new BehaviorSubject<any>('data');
    this.reportsCollection = new BehaviorSubject<any>('data');
  }

  getAllUsers(): any {
    firebase.database().ref('users').once('value', snapshot => {
      this.users = [];
      snapshot.forEach((node) => {
        const user = node.val();
        this.users.push(user);
      });
      this.setValue('query completed');
    });
  }

  getAllBooks(): any {
    firebase.database().ref('books').once('value', snapshot => {
      this.requiredBooks = [];
      this.donatedBooks = [];
      this.books = [];
      snapshot.forEach((node) => {
        const book = node.val();
        this.books.push(book);
        // if (book.purpose === 'Donation') {
        //   this.donatedBooks.push(book);
        // } else {
        //   this.requiredBooks.push(book);
        // }
      });
      this.setBooksValue('query completed');
    });
  }

  getAllReviews(): any {
    firebase.database().ref('reviews').once('value', snapshot => {
      this.reviews = [];
      snapshot.forEach((node) => {
        const review: any = node.val();
        this.reviews.push(review);
      });
      this.setReviewsValue('query completed');
    });
  }

  getAllReports(): any {
    firebase.database().ref('reports/').once('value', snapshot => {
      this.reports = [];
      snapshot.forEach((node) => {
        const report: any = node.val();
        this.reports.push(report);
      });
      this.setReportsValue('query completed');
    });
  }

  setBooksValue(value): any {
    return this.booksCollection.next(value);
  }

  getBookValue(): Observable<boolean> {
    return this.booksCollection.asObservable();
  }

  setReviewsValue(value): any {
    return this.reviewsCollection.next(value);
  }

  getReviewsValue(): Observable<boolean> {
    return this.reviewsCollection.asObservable();
  }

  setReportsValue(value): any {
    return this.reportsCollection.next(value);
  }

  getReportsValue(): Observable<boolean> {
    return this.reportsCollection.asObservable();
  }

  setValue(value): any {
    return this.usersCollection.next(value);
  }

  getValue(): Observable<boolean> {
    return this.usersCollection.asObservable();
  }
}
