import { Component, OnInit } from '@angular/core';
import { Enable } from 'src/app/domain/enable';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { EnableService } from 'src/app/service/enable.service';
import { PaymenmethodService } from 'src/app/service/paymenmethod.service';

@Component({
  selector: 'app-paymenmethod-save',
  templateUrl: './paymenmethod-save.component.html',
  styleUrls: ['./paymenmethod-save.component.css']
})
export class PaymenmethodSaveComponent implements OnInit {

  public paymenMethod:PaymentMethod;
  public enables: Enable[];

  public showMsg: boolean= false;
  public mensajes: string[]=[""];

  //Inyeccion de dependencia
  constructor(public paymenMethodService:PaymenmethodService,
              public enableServide:EnableService) { }

  ngOnInit(): void {
    this.paymenMethod=new PaymentMethod(null,"","");
    this.findAllEnable();
  }

  public findAllEnable():void{
    this.enables=this.enableServide.findAll();
  }

  public save():void{
    this.mensajes=[""],
    this.paymenMethodService.save(this.paymenMethod).subscribe(ok=>{
      this.showMsg=true;
      this.mensajes[0]="El paymenMethod se grabo con exito";
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.mensajes=err.error.erro;
    });
  }

}
