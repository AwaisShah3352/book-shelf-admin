import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import * as firebase from 'firebase';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarModule } from 'ng-sidebar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {IonicModule} from '@ionic/angular';
import { UsersComponent } from './pages/users/users.component';
import { BooksComponent } from './pages/books/books.component';
import { HelpDeskComponent } from './pages/help-desk/help-desk.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBYicFIdi9b2nJbsyIE4oL7EeYT5gOhz3c',
  authDomain: 'book-shelf-7341f.firebaseapp.com',
  databaseURL: 'https://book-shelf-7341f-default-rtdb.firebaseio.com',
  projectId: 'book-shelf-7341f',
  storageBucket: 'book-shelf-7341f.appspot.com',
  messagingSenderId: '276175535248',
  appId: '1:276175535248:web:0723e282abf154f433ac15',
  measurementId: 'G-NQ94VTFP9V'
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    BooksComponent,
    HelpDeskComponent,
    ReviewsComponent,
    ReportsComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    IonicModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    FormsModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
