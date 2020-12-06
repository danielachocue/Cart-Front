import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  public products:ShoppingCart;
  public products2:ShoppingCart[];
  pageActual:number=1;
  email:string=null;
  carId:number=null;
  title:string='Invoice';

  constructor(
    public shoppingProductService:ShoppingProductService,public shoppingCartService:ShoppingCartService,private routActive:ActivatedRoute,
    public auth: AngularFireAuth, public route:Router
  ) {}
  
  ngOnInit(): void {
    this.getProducts();
  }

  loadCustomer():void{
    this.routActive.params.subscribe(resp=>{
       this.email =resp['email'];
       this.carId=resp['carId']

    })
  }
  getProducts():void{
    this.loadCustomer();
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(ok=>{
      this.products=ok;
    })
  }

  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.route.navigate(['/login'])
    
  }

}
