import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shopproductadd } from '../domain/shopproductadd';
import { Email } from '../domain/email';
import { FinalizarCompra } from '../domain/finalizarCompra';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private url: string = environment.apiUrl + '/api/cart/';

  constructor(public httpClient: HttpClient) { }

  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  public createCart(email: Email): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'createCart', email, { headers: headers });
  }
  public addProduct(addShpr: Shopproductadd): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'addProduct', addShpr, { headers: headers });
  }
  public removeProduct(carId: number, proId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + 'removeProduct/' + carId + '/' + proId, { headers: headers });
  }
  public clearCart(carId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + 'clearCart/' + carId, { headers: headers });
  }
  public findShprByCarId(carId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findShprByCarId/' + carId, { headers: headers });
  }
  public findShcaByEmail(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findShcaByEmail/' + email, { headers: headers });
  }
  public finalizarCompra(finalizarCompra: FinalizarCompra): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(this.url + 'finalizarCompra', finalizarCompra, { headers: headers });
  }
  public historyCart(email:string):Observable<any>{
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url+'historyCart/'+email,{headers:headers});
  }
}
