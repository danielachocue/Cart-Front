import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddShoppingProduct } from '../domain/addShoppingProduct';
import { Email } from '../domain/email';
import { ShoppingCart } from '../domain/shoppingCart';
import { CloseShoppingCart } from '../domain/shoppingCartClose';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private  url:string=environment.apiUrl+'api/shoppingCart/';

  constructor(public httpClient:HttpClient, private router:Router) { }

  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    let headers= new HttpHeaders({'Authorization':token});
    return headers;
  }
  
  public findAll():Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get<any>(this.url+'findAll',{headers:headers});
  }

  public findById(carId:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get<any>(this.url+'findById/'+carId,{headers:headers});
  }

  public delete(carId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.delete<any>(this.url+'delete/'+carId,{headers: headers});
  }

  public save(shoppingCart:ShoppingCart):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.post<any>(this.url+'save',shoppingCart,{headers: headers});
  }

  public update(shoppingCart:ShoppingCart):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.put<any>(this.url+'update',shoppingCart,{headers: headers});
  }

  public createCart(email:Email):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.post<any>(this.url+'createCart',email,{headers:headers});
  }

  public addProduct(shoppingProduct:AddShoppingProduct):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.post<any>(this.url+'addProduct',shoppingProduct,{headers:headers});
  }

  public removeProduct(carId:number,proId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.delete<any>(this.url+'removeProduct/'+carId+"/"+proId,{headers:headers});
  }

  public clearCart(carId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.delete<any>(this.url+'clearCart/'+carId,{headers:headers});
  }

  public findShoppingProductByShoppingCart(carId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.put<any>(this.url+'findShoppingProductByShoppingCart/'+carId,{headers:headers});
  }

  public findCarIdShoppingCartsByEmail(email:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get<any>(this.url+'findCarIdShoppingCartsByEmail/'+email,{headers:headers});
  }

  public closeShoppingCart(cartClose:CloseShoppingCart):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.put<any>(this.url+'closeShoppingCart',cartClose,{headers:headers});
  }

  
  public selectPurchase(email:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get<any>(this.url+'selectPurchase/'+email,{headers:headers});
  }
}
