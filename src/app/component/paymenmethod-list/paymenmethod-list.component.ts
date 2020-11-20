import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { PaymenmethodService } from 'src/app/service/paymenmethod.service';

@Component({
  selector: 'app-paymenmethod-list',
  templateUrl: './paymenmethod-list.component.html',
  styleUrls: ['./paymenmethod-list.component.css']
})
export class PaymenmethodListComponent implements OnInit {

  public title: string='Lista de PaymentMethod'
  public paymentMethods:PaymentMethod[];

  public showMsg: boolean = false;
  public mensajes: string[] = [""];

  constructor(public paymentMethodService: PaymenmethodService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll():void{
    this.paymentMethodService.finAll().subscribe(data=>{
      this.paymentMethods=data;
    },error=>{
      console.error(error);
      
    });
  }

  public delete(payId:Number): void {
    this.mensajes = [""];
    this.paymentMethodService.delete(payId).subscribe(ok => {
      this.showMsg = true;
      this.mensajes[0] = "El PaymenMethod se borro con exito"+payId;
      this.findAll();
    }, err => {
      console.log(err)
      this.showMsg = true;
      this.mensajes = err.error.error;

    });
  }

}
