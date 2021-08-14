import {Component} from '@angular/core';
import {UtilsService} from './services/utils.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {DataCollectorService} from './services/data-collector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qob';
  opened = true;
  isloggedIn: any;

  constructor(
    public router: Router,
    public utils: UtilsService,
    public alertCtrl: AlertController,
    private dataCollecter: DataCollectorService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    dataCollecter.getLoginValue().subscribe(() => {
      this.isloggedIn = localStorage.getItem('isLoggedIn');
    });
  }

  // toggleMenu(): any {
  //   this.utils.toggleOpened();
  // }

  goHome(): any {
    this.router.navigate(['home']);
  }

  goUsersList(): any {
    this.router.navigate(['/users']);
  }

  goBooksList(): any {
    this.router.navigate(['/books']);
  }

  goToHelpDesk(): any {
    this.router.navigate(['/help-desk']);
  }

  goToReviews(): any {
    this.router.navigate(['/reviews']);
  }

  goToReports(): any {
    this.router.navigate(['/reports']);
  }

  goToProfile(): any {
    this.router.navigate(['/profile']);
  }

  async logOut(): Promise<any> {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Are you sure to logout?',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            localStorage.clear();
            this.dataCollecter.setLoginValue('data');
            this.router.navigate(['']);
          }
        }
      ]
    });
    await alert.present();
  }
}
