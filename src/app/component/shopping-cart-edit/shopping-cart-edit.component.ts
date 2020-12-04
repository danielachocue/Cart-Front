import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enable } from 'src/app/domain/enable';
import { shoppingCartModel } from 'src/app/modelos/shoppingCartModelo';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-edit',
  templateUrl: './shopping-cart-edit.component.html',
  styleUrls: ['./shopping-cart-edit.component.css']
})
export class ShoppingCartEditComponent implements OnInit {

  title: string = 'Update Shopping Cart';
  shoppingCart = new shoppingCartModel();
  enables: Enable[];

  constructor(private shoppingCartService: ShoppingCartService, private routActive: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.loadshoppingCart();
  }

  loadshoppingCart(): void {
    this.routActive.params.subscribe(resp => {
      let carId = resp['carId'];
      if (carId) {
        this.shoppingCartService.findById(carId).subscribe((data) => {
          this.shoppingCart = data;
        })
      }
    })
  }

  update() {
    this.shoppingCartService.update(this.shoppingCart).subscribe((rsp) => {
      alert("Shopping cart editado");
      this.route.navigate(['/shoppingCart'])
    })
  }

  back(): void {
    this.route.navigate(['/shoppingCart'])
  }
}
