import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.css']
})
export class ShoppingCartListComponent implements OnInit {
  
  public title:string='Lista de Shopping Cart';
  public shpcars:ShoppingCart[];
  id:string;
  pageActual:number=1;

  constructor(public shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
    this.findAll();

  }

  findAll():void{
    this.shoppingCartService.findAll().subscribe(data=>{
      this.shpcars=data;
      this.id='';
    },error=>{
      console.error(error);
    })
  } 

  findById(id:string):void{
    this.shoppingCartService.findById(id).subscribe(data=>{
      this.shpcars=[];
      this.shpcars.push(data);

    },error=>{
      console.error(error);
    })
  }

  delete(carId:string):void{
        this.shoppingCartService.delete(carId).subscribe(data=>{
          this.shpcars =this.shpcars;
          this.findAll();
          this.id='';
          alert("Shopping Cart eliminado")
        },error=>{
          console.log(error);
        }) 
  }

}
