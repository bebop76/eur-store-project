// loading.service.ts
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LazyLoadingService {
  public loading!: HTMLIonLoadingElement;
  constructor(private lazyLoading: LoadingController) {}

  async presentLoading() {
    const loading = await this.lazyLoading.create({
      message: 'Fetching data please wait...',
      translucent: true,
    });

    await loading.present();
    return loading;
  }
}
