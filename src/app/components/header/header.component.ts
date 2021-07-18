import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public utils: UtilsService
  ) {
  }

  ngOnInit(): void {
  }

  toggleMenu(): any {
    this.utils.toggleOpened();
  }
}
