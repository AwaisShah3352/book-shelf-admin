import {Router} from "@angular/router";
import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, LoadingController, ToastController} from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages = [];
  newMsg: '';
  channelName: any;
  loading: any;
  @ViewChild(IonContent) content: IonContent;

  constructor(public router: Router) {
  }

  ngOnInit() {
    var isloggedIn = localStorage.getItem('isLoggedIn');
    if(isloggedIn === 'true'){
      this.channelName = localStorage.getItem('selectedChannel');
      this.loadMessages();
    } else if(isloggedIn === null) {
      this.router.navigate(['']);
      alert('You are not logged in. Please login first...');
    }
  }

  loadMessages() {
    firebase.database().ref(`admin-chat/${this.channelName}/messages`).orderByChild('time').on('value', snapshot => {
      this.messages = [];
      snapshot.forEach((node) => {
        this.messages.push(node.val());
      });
      console.log(this.messages);
    }, err => {
      alert(err);
    });
  }

  sendMessage() {
    const key = firebase.database().ref().push().key;
    firebase.database().ref(`admin-chat/${this.channelName}/messages`).child(key).set({
      sender: 'admin',
      name: 'Admin User',
      time: Date.now(),
      message: this.newMsg
    }).then(res => {
    }).catch(err => console.log(err));
    this.newMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(10);
    });
  }

  goBack(){
    this.router.navigate(['help-desk']);
  }
}
