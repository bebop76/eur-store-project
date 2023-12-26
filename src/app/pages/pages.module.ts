import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsComponent } from './charts/charts.component';
import { ComponentsModule } from '../components/components.module';
import { FabButtonModule } from '../components/shared/fab-button/fab-button.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductAddModule } from '../components/product-add/product-add.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductsListComponent,
    ChartsComponent,
    ProductComponent,
    NotFoundComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    FabButtonModule,
    ProductAddModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    DashboardComponent,
    ProductsListComponent,
    ChartsComponent,
    ProductComponent,
    NotFoundComponent,
  ],
})
export class PagesModule {}
