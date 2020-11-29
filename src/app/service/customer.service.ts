import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  //coloco la ruta del servicio a partir  del api colocado en el archivo enviroment
  private url:string=environment.apiUrl+"api/customer/";
  private headers;
  //inyecto http
  constructor(public httpClient:HttpClient) {
    this.headers=this.createTokenHeader();
  }
  //coloco el token como header
  createTokenHeader():HttpHeaders{
    //obtengo el token
    let token=localStorage.getItem('token');
    //mando el token con la key definida en el back
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

