import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    let headers=new HttpHeaders({'Authorization':'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDU1NzkyODcsImlzcyI6Imh0dHBzOi8vemF0aHVyYWNvZGUub3JnIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2MDY0NDMyODd9.680UtsxSTWfaQXmm3TdfvmnWOe9B29I4a3m9_ASOQc8'});
    return headers
  }

  public finAll(): Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get(this.url+'findAll',{headers:headers});
  }

  public findById(payId: Number): Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get(this.url+'findById/'+payId,{headers:headers});
  }

  public save(paymentMethod:PaymentMethod):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.post(this.url+'save',paymentMethod,{headers:headers});
  }

  public update(paymentMethod:PaymentMethod):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.put(this.url+'update',paymentMethod,{headers:headers});
  }

  public delete(payId:Number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.delete(this.url+'delete/'+payId,{headers:headers});
  }
}
