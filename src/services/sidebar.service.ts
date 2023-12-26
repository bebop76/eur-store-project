import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(private menuController: MenuController) {}

  closeSidebar() {
    this.menuController.close();
  }
}
