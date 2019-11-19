import { Injectable } from '@angular/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { listMenuConfig } from '../config/list-menu-config';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  constructor(public _fuseNavigationService: FuseNavigationService) {
    for (const key in listMenuConfig) {
      if (listMenuConfig.hasOwnProperty(key)) {
        this._fuseNavigationService.register(key, listMenuConfig[key]);
      }
    }
  }
}
