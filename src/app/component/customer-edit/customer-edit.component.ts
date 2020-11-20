import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  //Id de customer
  public email: string;
  public customer: Customer;

  public enables: Enable[];

  public showMsg: boolean = false;
  public mensajes: string[] = [""];

  constructor(public router: Router,
    public activedRouter: ActivatedRoute, public customerService: CustomerService,
    public enableService: EnableService) { }

  ngOnInit(): void {
    let params = this.activedRouter.params['_value'];
    this.email = params.email;

    this.findById();
    this.findAllEnable();
  }

  public findById(): void {
    this.customerService.findById(this.email).subscribe(data => {
      this.customer = data;
      console.table(this.customer);
    })
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public update(): void {
    this.mensajes = [""];
    this.customerService.update(this.customer).subscribe(ok => {
      this.showMsg = true;
      this.mensajes[0] = "El customer se modifico con exito" + this.email;
    }, err => {
      console.log(err)
      this.showMsg = true;
      this.mensajes = err.error.error;

    });
  }

  public delete(): void {
    this.mensajes = [""];
    this.customerService.delete(this.customer.email).subscribe(ok => {
      this.showMsg = true;
      this.mensajes[0] = "El customer se borro con exito" + this.email;
    }, err => {
      console.log(err)
      this.showMsg = true;
      this.mensajes = err.error.error;

    });
  }

}
