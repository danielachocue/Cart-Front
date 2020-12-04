import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../domain/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private  url:string=environment.apiUrl+'api/shoppingCart/';

  constructor(public httClient:HttpClient, private router:Router) { }

  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    let headers= new HttpHeaders({'Authorization':token});
    return headers;
  }
  
  public findAll():Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'findAll',{headers:headers});
  }

  public findById(carId:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'findById/'+carId,{headers:headers});
  }

  public delete(carId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.delete<any>(this.url+'delete/'+carId,{headers: headers});
  }

  public save(carId:ShoppingCart):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.post<any>(this.url+'save',carId,{headers: headers});
  }

  public update(carId:ShoppingCart):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.put<any>(this.url+'update',carId,{headers: headers});

  }

  public createCart(email:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'createCart/'+email,{headers:headers});
  }

  public addProduct(carId:number,proId:string,quantity:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'addProduct/'+carId+"/"+proId+"/"+quantity,{headers:headers});
  }

  public removeProduct(carId:number,proId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.delete<any>(this.url+'removeProduct/'+carId+"/"+proId,{headers:headers});
  }

  public clearCart(carId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.delete<any>(this.url+'clearCart/'+carId,{headers:headers});
  }

  public findShoppingProductByShoppingCart(carId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.put<any>(this.url+'findShoppingProductByShoppingCart/'+carId,{headers:headers});
  }

  public findCarIdShoppingCartsByEmail(email:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'findCarIdShoppingCartsByEmail/'+email,{headers:headers});
  }

  public closeShoppingCart(carId:number,payId:number):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'closeShoppingCart/'+carId+"/"+payId,{headers:headers});
  }
}
