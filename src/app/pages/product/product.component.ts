import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { SidebarService } from 'src/services/sidebar.service';
import { ProductEntity } from 'src/app/models/product.model';
import { ApiCallsService } from 'src/services/api-calls.service';
import { LazyLoadingService } from 'src/services/lazyLoading.service';
import { ToastService } from 'src/services/toast.service';
import { SoundService } from 'src/services/sound.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public headerTitle = 'Product';
  public productId: string;
  public product!: ProductEntity;

  constructor(
    private sidebarService: SidebarService,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private apiServices: ApiCallsService,
    private router: Router,
    private toastController: ToastController,
    private lazyLoadingService: LazyLoadingService,
    private toastService: ToastService,
    private soundService: SoundService
  ) {
    // recupero l'id del prodoto dall' url
    this.productId = this.route.snapshot.queryParams['id'];
  }

  async ngOnInit(): Promise<void> {
    this.sidebarService.closeSidebar();
    this.soundService.playSound('loading');

    const loading = this.lazyLoadingService.presentLoading();

    // console.log("!!!!",this.productId)
    this.apiServices.getProductDetails(this.productId).subscribe({
      next: (product: ProductEntity) => {
        this.product = product;
        // console.log("------->",this.product)
      },
      error: (error: HttpErrorResponse) => {
        this.router.navigate(['/404']);
        return null;
      },
    });

    (await loading).dismiss();
  }

  public async deleteProduct() {
    console.log('Canc', this.productId);
    this.soundService.playSound('warning');
    const confirmAlert = await this.alertController.create({
      header: 'ATTENTION!',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Delete canceled');
            this.soundService.playSound('abort');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.apiServices.removeProduct(this.productId).subscribe({
              next: async (product: ProductEntity) => {
                this.soundService.playSound('success');
                console.log('Prodotto eliminato');

                const toast = await this.toastService.presentToast(
                  'Product deleted with success'
                );
                toast.onDidDismiss().then(() => {
                  // Reindirizza alla pagina 'product-list' dopo il dismiss del Toast
                  this.router.navigate(['/products-list']);
                });
              },
              error: async (error: HttpErrorResponse) => {
                this.soundService.playSound('warning');
                console.log(error.message);
                const toast = await this.toastService.presentToast(
                  'There was a problem to delete this product'
                );
                toast.onDidDismiss().then(() => {
                  this.router.navigate(['/products-list']);
                });
              },
            });
          },
        },
      ],
    });

    await confirmAlert.present();
  }

  trackReviews = (index: number, itemObject: string): string => {
    return itemObject;
  };
}
