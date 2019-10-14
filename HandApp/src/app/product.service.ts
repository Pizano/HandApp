import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:52834/';

  httpOptions = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
    })
  };

  constructor(
    private http: HttpClient
  ) {}


  getProduct(): Observable < Product[] > {
    return this.http.get < Product[] > (this.apiUrl + 'api/Product')
      .pipe(
        tap(_ => console.log('entro al tap de getProduct')),
        catchError(this.handleError < Product[] > ('getProduct', []))
      );
  }


  getProductId(id :number): Observable < Product > {
    return this.http.get < Product > (this.apiUrl + 'api/Product/' + id)
      .pipe(
        tap(_ => console.log('entro al tap de getProductId')),
        catchError(this.handleError < Product > ('getProductId'))
      );
  }


  UpdateProduct(product: Product): Observable<Product> {
   
    return this.http.put<Product>(this.apiUrl + 'api/Product', product, this.httpOptions).pipe(
      tap((newProduct: Product) => console.log(`UpdateProduct w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('UpdateProduct'))
    );
  }


  DeleteProduct (id : number): Observable<Product> {
    return this.http.delete<Product>(this.apiUrl + 'api/Product/'+ id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  PostProduct (product: Product): Observable<Product> {
   
    return this.http.post<Product>(this.apiUrl + 'api/Product', product, this.httpOptions).pipe(
      tap((newProduct: Product) => console.log(`PostProduct w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('PostProduct'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError < T > (operation = 'operation', result ? : T) {
    return (error: any): Observable < T > => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
