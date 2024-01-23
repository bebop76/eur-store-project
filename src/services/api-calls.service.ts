import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ProductEntity } from 'src/app/models/product.model';
import { StatsCategoryEntity } from 'src/app/models/stats-category.model';
import { StoreEntity } from 'src/app/models/store.model';
import { ProductsEntity } from 'src/app/models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  private productsSubject: BehaviorSubject<ProductsEntity[]> =
    new BehaviorSubject<ProductsEntity[]>([]);
  public products$: Observable<ProductsEntity[]> =
    this.productsSubject.asObservable();

  private idStore: string = '';
  private apiUrl: string =
    '';

  constructor(private http: HttpClient) {}

  //Recupera tutti gli stores
  public getStores(): Observable<StoreEntity[]> {
    const url = `${this.apiUrl}/stores`;
    return this.http.get<StoreEntity[]>(url);
  }

  // public getProductsFromStore(): Observable<ProductsEntity[]>{
  //   const url = `${this.apiUrl}/stores/${this.idStore}/products`
  //   return this.http.get<ProductsEntity[]>(url);
  // }
  //Recupera tutti i prodotti dallo store: Per questa chiamata uso una implementazionesubjet di Observer a differnza delle altre
  // api che usano solo un Observer, questo per evitare di dover ricaricare la pagina products-list una volta creato un prodotto
  //(a differenza del delete che per ovvie ragioni deve eseguire un redirect)
  public getProductsFromStore(): void {
    const url = `${this.apiUrl}/stores/${this.idStore}/products`;
    this.http.get<ProductsEntity[]>(url).subscribe(
      (product) => {
        this.productsSubject.next(product);
      },
      (error) => {
        console.log('Error fetching data');
      }
    );
  }

  //Recupera tutti il singolo prodotto
  public getProductDetails(idProduct: string): Observable<ProductEntity> {
    const url = `${this.apiUrl}/stores/${this.idStore}/products/${idProduct}`;
    return this.http.get<ProductEntity>(url);
  }
  //aggiunge un prodotto
  public addProduct(newObject: ProductEntity): Observable<string> {
    const url = `${this.apiUrl}/stores/${this.idStore}/products`;
    return this.http.post<string>(url, newObject);
  }

  //rimuove un prodotto
  public removeProduct(id: string): Observable<ProductEntity> {
    const url = `${this.apiUrl}/stores/${this.idStore}/products/${id}`;
    return this.http.delete<ProductEntity>(url);
  }
  //recupera i dati del grafico
  public getChart(): Observable<StatsCategoryEntity> {
    const url = `${this.apiUrl}/stores/${this.idStore}/stats/categories`;
    return this.http.get<StatsCategoryEntity>(url);
  }
}
