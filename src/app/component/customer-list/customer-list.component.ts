import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';

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

  constructor(public customerService:CustomerService) { }

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
    this.mensajes = [""];
    this.customerService.delete(email).subscribe(ok => {
      this.showMsg = true;
      this.mensajes[0] = "El customer "+email+ " se borro con exito";
      this.findAll();
    }, err => {
      console.log(err)
      this.showMsg = true;
      this.mensajes = err.error.error;

    });
  }

}