import { NgModule } from '@angular/core';
import { IonFab, IonFabButton, IonIcon, IonicModule } from '@ionic/angular';
import { FabButtonComponent } from './fab-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FabButtonComponent],
  imports: [CommonModule, IonicModule],
  exports: [FabButtonComponent],
})
export class FabButtonModule {}
