import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-preview-lista',
  templateUrl: './preview-lista.component.html',
  styleUrls: ['./preview-lista.component.css']
})
export class PreviewListaComponent implements OnInit {

  public clientFirebase: Subscription = new Subscription();
  title:string='Shopping Record';
  pageActual:number=1;
  carId:number=null;
  email:string=null;
  public shpcars:ShoppingCart[];
  public shpcars2:ShoppingCart[]=[];
  constructor(public shoppingProductService:ShoppingProductService,
              public shoppingCartService:ShoppingCartService,
              private routActive:ActivatedRoute, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.clientFirebase = this.auth.user.subscribe((userFirebase) => {
      this.email = userFirebase.email;
    });
    this.findAll();

  }
  
  findAll():void{
    this.shoppingCartService.findAll().subscribe(data=>{
      this.shpcars=data;
      this.shpcars.forEach(resp => {
        if(resp.customerEmail==this.email && resp.paymentMethodId!=null){
          this.shpcars2.push(resp);
        }
      });
    },error=>{
      console.error(error);
    })  
  }

}
