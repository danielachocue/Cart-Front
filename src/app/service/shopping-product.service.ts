import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingProduct } from '../domain/shoppingProduct';

@Injectable({
  providedIn: 'root'
})
export class ShoppingProductService {

  private  url:string=environment.apiUrl+'api/shoppingProduct/';

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

  public findById(shprId:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get<any>(this.url+'findById/'+shprId,{headers:headers});
  }

  public delete(shprId:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.delete<any>(this.url+'delete/'+shprId,{headers: headers});

  }

  public save(shprId:ShoppingProduct):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.post<any>(this.url+'save',shprId,{headers: headers});

  }

  public update(shprId:ShoppingProduct):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.put<any>(this.url+'update',shprId,{headers: headers});

  }
}
