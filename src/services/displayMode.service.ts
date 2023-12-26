import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { ProductEntity } from 'src/app/models/product.model';
import { ProductsEntity } from 'src/app/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class DisplayModeService {
  constructor() {}

  public savedDisplayMode(mode: string): void {
    sessionStorage.setItem('display-card', mode);
  }

  public loadDisplayMode() {
    return sessionStorage.getItem('display-card');
  }
}
