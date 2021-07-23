import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  uid: string;
  constructor(public router: Router) { }

  ngOnInit(): void {
    var isloggedIn = localStorage.getItem('isLoggedIn');
    if(isloggedIn === 'true'){
      var uid = JSON.parse(localStorage.getItem('uid'));
      firebase.database().ref(`users/${uid}`).once('value', snapshot => {
        console.log('snap: ', snapshot.val());
        this.user = snapshot.val();
      });
      console.log('user: ', uid);
    } else if(isloggedIn === null) {
      this.router.navigate(['']);
      alert('You are not logged in. Please login first...');
    }
  }

}
