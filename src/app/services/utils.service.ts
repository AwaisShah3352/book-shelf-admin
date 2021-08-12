import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  opened = true;

  alert;
  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  toggleOpened(): any {
    this.opened = !this.opened;
  }

  async presentAlert(messag): Promise<string> {
    const alert = await this.alertCtrl.create({
      header: 'Note Please !',
      message: messag,
      buttons: [{
        text: 'Okay',
        cssClass: 'primary',
        handler: () => {
          console.log('Confirm Okay');
        }
      }]
    });
    alert.present();
    return alert.toString();
  }

  async presentLoading(msg): Promise<string> {
    const loading = await this.loadingCtrl.create({
      message: msg,
      duration: 3000
    });
    loading.present();
    return loading.toString();
  }

  async presentToast(msg): Promise<string> {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
    return toast.toString();
  }

}
