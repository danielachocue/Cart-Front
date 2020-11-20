import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../domain/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymenmethodService {

  private url: string=environment.apiUrl+'api/paymentMethod/';

  constructor(public httpClient:HttpClient) { }

  public finAll(): Observable<any>{
    return this.httpClient.get(this.url+'findAll');
  }

  public findById(payId: Number): Observable<any>{
    return this.httpClient.get(this.url+'findById/'+payId);
  }

  public save(paymentMethod:PaymentMethod):Observable<any>{
    return this.httpClient.post(this.url+'save',paymentMethod);
  }

  public update(paymentMethod:PaymentMethod):Observable<any>{
    return this.httpClient.put(this.url+'update',paymentMethod);
  }

  public delete(payId:Number):Observable<any>{
    return this.httpClient.delete(this.url+'delete/'+payId);
  }
}
