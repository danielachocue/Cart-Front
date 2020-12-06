import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
  constructor(public router: Router, public paymenMethodService:PaymenmethodService,
              public enableServide:EnableService,public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.paymenMethod=new PaymentMethod(null,"","");
    this.findAllEnable();
  }

  public findAllEnable():void{
    this.enables=this.enableServide.findAll();
  }

  public save():void{
    this.paymenMethodService.save(this.paymenMethod).subscribe(ok=>{
      alert("payment method guardado exitosamente");
      this.paymenMethodService.update(this.paymenMethod).subscribe(ok=>{
        this.router.navigate(['/paymenmethod-list']);
      }, err=>{
        alert(err.error.error);
      });
    },err=>{
      console.log(err);
      alert(err.error.error);
    });
  }

  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.router.navigate(['/login'])
    
  }

}
