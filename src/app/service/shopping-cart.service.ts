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

  public delete(carId:string):Observable<any>{
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
}
