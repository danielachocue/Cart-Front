import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddShoppingProduct } from 'src/app/domain/addShoppingProduct';
import { Email } from 'src/app/domain/email';
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
  public shoppingProduct: AddShoppingProduct;
  public creatCartEmail: Email = new Email(null);
  public clientFirebase: Subscription =new Subscription

  constructor(public productService: ProductService, public shoppingCartService: ShoppingCartService, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.findAll();
    this.clientFirebase=this.auth.user.subscribe((userFirebase)=>{
      this.email = userFirebase.email;
      this.checkCarts();
   })

  }
  findAll(): void {
    this.productService.findAll().subscribe(data => {
      this.products = data;
    }, error => {
      console.error(error);
    })
  }

  addProduct(proId: string, product: string): void {

    this.shoppingProduct = new AddShoppingProduct(null, null, null);
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(resp => {
      this.carts = resp;
      this.carts.forEach(car => {
        if (car.enable === 'Y' && car.paymentMethodId === null) {
          this.carId = car.carId;
          this.shoppingProduct.carId = car.carId;
          this.shoppingProduct.proId = proId;
          this.shoppingProduct.quantity = this.quantity;
          this.shoppingCartService.addProduct(this.shoppingProduct).subscribe((respo) => {
            alert("producto agregado");
          })
        }
      });
      this.quantity = 1;
    })
  }

  itemsShoppingCart(): void {
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(resp => {
      this.carts = resp;
      this.carts.forEach(car => {
        if (car.enable === 'Y' && car.paymentMethodId === null) {
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
          this.creatCartEmail.email = this.email;
          this.shoppingCartService.createCart(this.creatCartEmail).subscribe(resp => {
            setTimeout(() => {
              this.itemsShoppingCart();
            }, 300);
          })
        } else {
          setTimeout(() => {
            this.carts.forEach(car => {
              if (car.enable === 'Y' && car.paymentMethodId === null) {
                setTimeout(() => {
                  this.itemsShoppingCart();
                  validate = true;
                }, 300);
              }

            }
            )
            setTimeout(() => {
              if (validate === false) {
                this.creatCartEmail.email = this.email;
                this.shoppingCartService.createCart(this.creatCartEmail).subscribe(resp => {
                  setTimeout(() => {
                    this.itemsShoppingCart();
                  }, 500);
                })

              }
            }, 500);

          }, 700);
        }


      })

    }, 1000);

  }

  clearCart(): void {
    this.shoppingCartService.findCarIdShoppingCartsByEmail(this.email).subscribe(resp => {
      this.carts = resp;
      this.carts.forEach(car => {
        if (car.enable === 'Y') {
          this.carId = car.carId;
          this.shoppingCartService.clearCart(this.carId).subscribe(data => {
            this.totalItems = 0;
          }, error => {
          })
        }
      })
    })
  }


}
