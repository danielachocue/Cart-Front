import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent implements OnInit {

  public carts: ShoppingCart[];
  public products: ShoppingProduct[];

  constructor(public shoppingProductService: ShoppingProductService, public shoppingCartService: ShoppingCartService, private routActive: ActivatedRoute) { }

  carId: number;
  ngOnInit(): void {
    this.getCarId();
  }

  getCarId(): void {
    this.routActive.params.subscribe(resp => {
      let email = resp['email'];
      if (email) {
        this.shoppingCartService.findCarIdShoppingCartsByEmail(email).subscribe(resp => {
          this.carts = resp;
          this.carts.forEach(resp => {
            this.carId = resp.carId;
          });
          this.getProducts();
        })

      }
    })
  }

  getProducts(): void {
    this.shoppingProductService.findAll().subscribe(resp => {
      this.products = resp;
      this.products.forEach(resp => {
      });
    })
  }

  delete(proId: number): void {
    this.shoppingCartService.removeProduct(this.carId, proId).subscribe(data => {
      alert("Producto eliminado");
      this.getProducts();
    }, error => {
      console.log(error);
    })


  }

}
