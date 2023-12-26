import { NgModule } from '@angular/core';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FabButtonModule } from './shared/fab-button/fab-button.module';

@NgModule({
  declarations: [HeaderTitleComponent, SidebarComponent],
  imports: [CommonModule, RouterModule, IonicModule, FabButtonModule],
  exports: [HeaderTitleComponent, SidebarComponent],
})
export class ComponentsModule {}
