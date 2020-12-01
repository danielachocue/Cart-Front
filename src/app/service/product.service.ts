import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private url: string=environment.apiUrl+'api/product/';
  private headers;
  
  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    let headers= new HttpHeaders({'Authorization':token});
    return headers;
  }

  constructor(public httClient: HttpClient) { 
    this.headers=this.createTokenHeader();
  }

  public findAll(): Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get(this.url+'findAll', {headers:headers});
  }

  public findById(proId: string): Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.get(this.url+'findById/'+proId, {headers:headers});
  }

  public save(product:Product):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.post(this.url+'save',product, {headers:headers});
  }

  public update(product:Product):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.put(this.url+'update',product, {headers:headers});
  }
  
  public delete(proId:String):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httClient.delete(this.url+'delete/'+proId, {headers:headers});
  }
}
