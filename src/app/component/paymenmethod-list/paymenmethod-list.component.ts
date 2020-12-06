import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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

  constructor(public paymentMethodService: PaymenmethodService,public auth: AngularFireAuth,public router:Router) { }

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
    this.paymentMethodService.delete(payId).subscribe(ok => {
      alert("Metodo de pago eliminado exitosamente");
      this.findAll();
    }, err => {
      console.log(err)
      alert(err.error.erro);

    });
  }
  
  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.router.navigate(['/login'])
    
  }

}
