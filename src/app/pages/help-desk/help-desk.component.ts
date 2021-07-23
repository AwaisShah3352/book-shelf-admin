import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss']
})
export class HelpDeskComponent implements OnInit {

  channels: any =[];
  constructor(public router: Router) {
  }

  ngOnInit(): void {
    this.loadAdminChatChannels();
  }

  loadAdminChatChannels() {
    firebase.database().ref(`admin-channels`).on('value', snapshot => {
      this.channels = [];
      snapshot.forEach((node) => {
        this.channels.push(node.val());
      });
      console.log('channels', this.channels);
    }, err => {
      alert(err);
    });
  }

  openChat(name) {
    localStorage.setItem('selectedChannel', name);
    this.router.navigate(['/chat']);
  }

}
