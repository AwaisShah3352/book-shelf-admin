import {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './pages/users/users.component';
import {BooksComponent} from './pages/books/books.component';
import {HelpDeskComponent} from './pages/help-desk/help-desk.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ReportsComponent} from './pages/reports/reports.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'help-desk',
    component: HelpDeskComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'reviews',
    component: ReviewsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
