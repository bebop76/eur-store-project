import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductAddComponent } from './product-add.component';

@NgModule({
  declarations: [ProductAddComponent],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  exports: [ProductAddComponent],
})
export class ProductAddModule {}
