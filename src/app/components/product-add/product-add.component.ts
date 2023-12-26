import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductEntity } from 'src/app/models/product.model';
import { ProductsEntity } from 'src/app/models/products.model';
import { ApiCallsService } from 'src/services/api-calls.service';
import { SoundService } from 'src/services/sound.service';
import { ToastService } from 'src/services/toast.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  public form: FormGroup;
  public reviewsArray: string[] = [];

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private apiService: ApiCallsService,
    private toastService: ToastService,
    private soundService: SoundService
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, Validators.required],
      employee: ['', Validators.required],
      review: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.soundService.playSound('warning');
  }

  public async closeModal(): Promise<void> {
    this.modalCtrl.dismiss();
  }

  public async createProduct() {
    // console.log(this.form.value)
    // creo l'array di stringhe che conterrà le reviews
    this.reviewsArray.push(this.form.value.review);
    const obj = {
      title: this.form.value.title,
      description: this.form.value.description,
      category: this.form.value.category,
      price: this.form.value.price,
      employee: this.form.value.employee,
      reviews: this.reviewsArray,
    };
    this.apiService.addProduct(obj).subscribe({
      next: async (newProduct: string) => {
        //Questa chiamata sebbene scriva obj a db passa sempre dall'error e il console log seguente non verrà mai
        // visualizzato. L'errore che da in console è (SyntaxError: Unexpected token 'Z', "Z505JeJxj4y6kTnCevdW" is not valid JSON at JSON.parse (<anonymous>) at XMLHttpRequest.onLoad)
        //  Per cui lo metto nel caso error
        console.log('Product added successfully!', newProduct);
      },
      error: async (error: HttpErrorResponse) => {
        const toast = await this.toastService.presentToast(
          'Product added with success'
        );
        this.soundService.playSound('success');
        this.apiService.getProductsFromStore();
        toast.onDidDismiss().then(() => {
          // this.redirectionPage()
        });
        console.log(error);
      },
    });

    this.dismissModal();
  }

  // public redirectionPage(){
  //   this.router.navigateByUrl('/products-list', { skipLocationChange: true }).then(() => {
  //     window.location.reload();
  //   });
  // }

  public dismissModal() {
    this.modalCtrl.dismiss();
  }
}
