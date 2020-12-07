import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public titulo:string='Lista de Clientes';
  public customers:Customer[];

  public showMsg: boolean = false;
  public mensajes: string[] = [""];

  constructor(public customerService:CustomerService, private router:Router,public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll():void{
    this.customerService.findAll().subscribe(data=>{
        this.customers=data;
    },error=>{
        console.error(error);
    });
  }
  public delete(email:string): void {
    this.customerService.delete(email).subscribe(ok => {
      alert("Customer eliminado exitosamente");
      this.findAll();
    }, err => {
      alert(err.error.error);
    });
  }
  
  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.router.navigate(['/login'])
    
  }

}