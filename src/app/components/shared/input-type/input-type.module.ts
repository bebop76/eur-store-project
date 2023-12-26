import { NgModule } from '@angular/core';
import { InputTypeComponent } from './input-type.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
InputTypeComponent,
],
imports:[
  CommonModule,
  IonicModule,
  ReactiveFormsModule
],
exports: [
InputTypeComponent

  ],
})
export class InputTypeModule {}