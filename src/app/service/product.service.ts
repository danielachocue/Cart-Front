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

  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    let headers=new HttpHeaders({'Authorization':'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDU1NzkyODcsImlzcyI6Imh0dHBzOi8vemF0aHVyYWNvZGUub3JnIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2MDY0NDMyODd9.680UtsxSTWfaQXmm3TdfvmnWOe9B29I4a3m9_ASOQc8'});
    return headers
  }

  constructor(public httClient: HttpClient) { }

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
