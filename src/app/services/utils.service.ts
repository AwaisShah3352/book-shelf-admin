import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  opened = true;

  constructor() {
  }

  toggleOpened(): any {
    this.opened = !this.opened;
  }
}
