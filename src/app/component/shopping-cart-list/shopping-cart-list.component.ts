import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { CloseShoppingCart } from 'src/app/domain/shoppingCartClose';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.css']
})
export class ShoppingCartListComponent implements OnInit {

  public title: string = 'Lista de Shopping Cart';
  public shpcars: ShoppingCart[];
  id: string;
  pageActual: number = 1;
  public cartClose:CloseShoppingCart= new CloseShoppingCart(null,null);

  constructor(public shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.findAll();

  }

  findAll(): void {
    this.shoppingCartService.findAll().subscribe(data => {
      this.shpcars = data;
      this.id = '';
    }, error => {
      console.error(error);
    })
  }

  findById(id: string): void {
    this.shoppingCartService.findById(id).subscribe(data => {
      this.shpcars = [];
      this.shpcars.push(data);

    }, error => {
      console.error(error);
    })
  }

  delete(carId: number): void {
    this.shoppingCartService.delete(carId).subscribe(data => {
      this.shpcars = this.shpcars;
      this.findAll();
      this.id = '';
      alert("Shopping Cart eliminado")
    }, error => {
      console.log(error);
    })
  }

  clearCart(carId: number): void {
    this.shoppingCartService.clearCart(carId).subscribe((rsp) => {
      this.findAll();
    }, error => {
    })
  }

  disabled(carId: number, payId: number = 1): void {
    this.cartClose.carId=carId;
    this.cartClose.payId=payId;
    console.log(this.cartClose);
    this.shoppingCartService.closeShoppingCart(this.cartClose).subscribe((resp)=>{
      this.findAll();
    }
    )

  }

}
