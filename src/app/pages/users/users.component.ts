import {Component, OnInit} from '@angular/core';
import {DataCollectorService} from '../../services/data-collector.service';
import {Router} from '@angular/router';
import {ActionSheetController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  opened = false;
  data;
  users: any = [];
  result: any;

  constructor(public dataCollector: DataCollectorService,
              public actionCtrl: ActionSheetController,
              public utils: UtilsService,
              public router: Router) {
  }

  ngOnInit(): void {
    const isloggedIn = localStorage.getItem('isLoggedIn');
    if (isloggedIn === 'true') {
      this.dataCollector.getAllUsers();
      this.loadUsers();
    } else if (isloggedIn === null) {
      this.router.navigate(['']);
      alert('You are not logged in. Please login first...');
    }
  }

  loadUsers(): any {
    this.dataCollector.getValue().subscribe((data: any) => {
      this.users = this.dataCollector.users;
    });
  }

  async moreOptions(user): Promise<string> {
    const result: any = await this.actionCtrl.create({
      mode: 'ios',
      header: 'More Options !!!',
      cssClass: 'primary',
      buttons: [
        {
          text: 'Delete',
          icon: 'pencil-sharp',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: user?.isActive ? 'Block' : 'Unblock',
          icon: 'newspaper',
          cssClass: 'danger',
          handler: () => {
            this.utils.presentLoading('please wait...');
            firebase.database().ref(`/users/${user?.uid}`).update({
              isActive: user?.isActive ? false : true,
            }).then(res => {
            }).catch(err => {
              alert(err);
            });
          }
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          icon: 'backspace',
          cssClass: 'primary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await result.present();
    return result;
  }
}
