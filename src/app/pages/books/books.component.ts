import { Component, OnInit } from '@angular/core';
import {DataCollectorService} from '../../services/data-collector.service';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  data;
  books: any = [];
  constructor(public dataCollector: DataCollectorService,
              private actionSheetController: ActionSheetController) {
    this.dataCollector.getAllBooks();
    this.loadBooks();
  }

  ngOnInit(): void {
  }

  loadBooks(): any {
    this.dataCollector.getBookValue().subscribe((data: any) => {
      this.books = this.dataCollector.books;
    });
  }

  async presentActionSheet(): Promise<any> {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
