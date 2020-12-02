import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { CartServiceService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
 
  public shoppingCarts: ShoppingCart[];
  public email: string;
  pageActual: number = 1;
  
  constructor(public cartService: CartServiceService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.activatedRoute.params['_value'];
    this.email = params.email;
    this.findShcaByEmail();
  }

  public findShcaByEmail(): void {
    this.cartService.findShcaByEmail(this.email).subscribe(
      data => {
        this.shoppingCarts = data;
      }, error => {
        console.log(error);
      }
    );
  }
}
