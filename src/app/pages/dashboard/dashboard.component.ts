import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { SidebarService } from 'src/services/sidebar.service';
import { StoreEntity } from 'src/app/models/store.model';
import { ApiCallsService } from 'src/services/api-calls.service';
import { LazyLoadingService } from 'src/services/lazyLoading.service';
import { DisplayModeService } from 'src/services/displayMode.service';
import { SoundService } from 'src/services/sound.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public headerTitle = 'Dashboard';
  public stores: StoreEntity[] = [];

  constructor(
    private sidebarService: SidebarService,
    private modalCtrl: ModalController,
    private apiServices: ApiCallsService,
    private router: Router,
    private storeService: DisplayModeService,
    private lazyLoadingService: LazyLoadingService,
    private soundService: SoundService
  ) {}

  async ngOnInit(): Promise<void> {
    this.sidebarService.closeSidebar();
    this.soundService.playSound('loading');

    const loading = this.lazyLoadingService.presentLoading();
    this.stores = await firstValueFrom(this.apiServices.getStores());
    (await loading).dismiss();

    // console.log(this.stores)
  }

  public enterStore() {
    this.soundService.playSound('enter');
    this.router.navigate(['/products-list']);
  }
}
