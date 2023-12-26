import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription, firstValueFrom } from 'rxjs';
import { ProductAddComponent } from 'src/app/components/product-add/product-add.component';
import { SidebarService } from 'src/services/sidebar.service';
import { ProductsEntity } from 'src/app/models/products.model';
import { ApiCallsService } from 'src/services/api-calls.service';
import { DisplayModeService } from 'src/services/displayMode.service';
import { LazyLoadingService } from 'src/services/lazyLoading.service';
import { SoundService } from 'src/services/sound.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  public headerTitle: string = '';
  // Variabili di stile
  public vertical: string = 'bottom';
  public horizontal: string = 'end';
  public slot: string = 'fixed';
  public addStyles: {} = {
    position: 'fixed',
    marginBottom: '3rem',
    marginRight: '3rem',
  };

  public storeProducts: ProductsEntity[] = [];

  // display mode predefinita è card
  public displayCards: string = 'cards';
  private sub: Subscription;

  constructor(
    private sidebarService: SidebarService,
    private modalCtrl: ModalController,
    private apiServices: ApiCallsService,
    private route: ActivatedRoute,
    private router: Router,
    private lazyLoadingService: LazyLoadingService,
    private displayModeService: DisplayModeService,
    private soundService: SoundService
  ) {
    this.headerTitle = 'Products List';
    this.sub = this.apiServices.products$.subscribe(
      (products: ProductsEntity[]) => {
        this.storeProducts = products;
      }
    );
  }

  async ngOnInit(): Promise<void> {
    // assegnazione valore preso da session storage
    this.displayCards = this.displayModeService.loadDisplayMode() || 'cards';
    this.soundService.playSound('loading');

    this.sidebarService.closeSidebar();
    const loading = this.lazyLoadingService.presentLoading();

    // chiamata API
    // this.storeProducts = await firstValueFrom(this.apiServices.getProductsFromStore());
    this.apiServices.getProductsFromStore();
    console.log(this.storeProducts);

    (await loading).dismiss();
    console.log(this.storeProducts);
  }

  public enterProduct(productId: string) {
    this.soundService.playSound('enter');
    this.router.navigate(['/product'], {
      queryParams: { id: productId },
      //nel caso vorremmo passare altri dati
      // state: {name: storeName.name}
    });
  }
  async handleFabButtonClick(): Promise<void> {
    let breakpoints: [number, number];
    let initialBreakpoint: number;
    breakpoints = [0.75, 1];
    initialBreakpoint = 0.75;
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: ProductAddComponent,
      componentProps: {
        //nel caso vorremmo passare altri dati
        // productsList: this.storeProducts
      },
      breakpoints,
      initialBreakpoint,
    });
    await modal.present();
    const res = await modal.onWillDismiss();
    if (res.data) {
      console.log('Fab button clicked!');
    }
  }

  handleDisplayTypeChange() {
    //controlla in session storage che tipo di disposizione deve avere la lista
    if (this.displayCards === 'cards') {
      this.displayModeService.savedDisplayMode('list');
    } else {
      this.displayModeService.savedDisplayMode('cards');
    }
    this.displayCards = this.displayModeService.loadDisplayMode() || 'cards';
    console.log(this.displayCards);
  }
  trackStore = (index: number, itemObject: ProductsEntity): string => {
    return itemObject.id;
  };

  ngOnDestroy(): void {
    // Assicurati di annullare l'iscrizione quando il componente viene distrutto
    this.sub.unsubscribe();
  }
}
