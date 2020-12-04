import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/domain/product';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ProductService } from 'src/app/service/product.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  public products: Product[];
  email: string;
  totalItems: number = 0;
  quantity: number = 1;
  carId: number;
  public carts: ShoppingCart[];

  constructor(public productService: ProductService, public shoppingCartService: ShoppingCartService, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.findAll();

  }
  findAll(): void {
    this.productService.findAll().subscribe(data => {
      this.products = data;
    }, error => {
      console.error(error);
    })
  }

  addProduct(proId: string, product: string): void {
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(resp => {
      this.carts = resp;
      this.carts.forEach(car => {
        this.carId = car.carId;
        this.shoppingCartService.addProduct(this.carId, proId, this.quantity).subscribe((resp) => {
        })
      });
      this.quantity = 1;
    })

  }

  itemsShoppingCart(): void {
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(resp => {
      this.carts = resp;
      this.carts.forEach(car => {
        if (car.enable === 'Y') {
          this.totalItems = car.items;
        }
      });
    })
  }

  checkCarts(): void {
    let validate = false;
    setTimeout(() => {
      this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(x => {
        this.carts = x;
        if (this.carts === null) {
          this.shoppingCartService.createCart(this.email).subscribe(resp => {
            setTimeout(() => {
              this.itemsShoppingCart();
            }, 300);
          })
        } else {
          setTimeout(() => {
            this.carts.forEach(car => {
              if (car.enable === 'Y') {
                setTimeout(() => {
                  this.itemsShoppingCart();
                  validate = true;
                }, 300);
              }

            }
            )
            setTimeout(() => {
              if (validate === false) {
                this.shoppingCartService.createCart(this.email).subscribe(resp => {
                  setTimeout(() => {
                    this.itemsShoppingCart();
                  }, 300);
                })

              }
            }, 300);

          }, 500);
        }


      })

    }, 1000);

  }

  clearCart(): void {
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(resp => {
      this.carts = resp;
      alert("Shopping Car limpio");
      this.carts.forEach(car => {
        if (car.enable == 'Y') {
          this.carId = car.carId;
        }
      })
    }, err => {
      console.log(err);
    })
  }
}
