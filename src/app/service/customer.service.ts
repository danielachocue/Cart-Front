import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private url:string=environment.apiUrl+"api/customer/";
  private headers;
  constructor(public httpClient:HttpClient) {
    this.headers=this.createTokenHeader();
  }

  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    let headers= new HttpHeaders({'Authorization':token});
    return headers;
  }

  public findAll():Observable<any>{
    return this.httpClient.get(this.url+'findAll',{headers:this.headers});
  }
  public findById(email:string):Observable<any>{
    return this.httpClient.get(this.url+'findById/'+email,{headers:this.headers});
  }

  public findByIdWithHeaders(email:string):Observable<any>{
    this.headers=this.createTokenHeader();
    return this.httpClient.get(this.url+'findById/'+email,{headers:this.headers});
  }

  public save(customer:Customer):Observable<any>{
    return this.httpClient.post(this.url+'save',customer,{headers:this.headers});
  }
  public update(customer:Customer):Observable<any>{
    return this.httpClient.put(this.url+'update',customer,{headers:this.headers});
  }
  public delete(email:string):Observable<any>{
    return this.httpClient.delete(this.url+'delete/'+email,{headers:this.headers});
  }

}

