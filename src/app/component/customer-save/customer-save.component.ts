import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';

@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit {

  public customer: Customer;
  public enables: Enable[];

  public showMsg: boolean = false;
  public mensajes: string[] = [""];

  //inyeccion de dependencia
  constructor(public customerService: CustomerService,
    public enableService: EnableService, public authService: AuthService) { }

  ngOnInit(): void {
    this.customer = new Customer("", "", "Y", "", "", "", "A");
    this.findAllEnable();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public save(): void {
    this.mensajes = [""];
    this.customerService.save(this.customer).subscribe(ok => {
      this.showMsg = true;
      this.mensajes[0] = "El customer se grabo con exito"
    }, err => {
      console.log(err)
      this.showMsg = true;
      this.mensajes = err.error.error;

    });
  }
}
