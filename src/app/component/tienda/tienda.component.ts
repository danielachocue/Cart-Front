import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/domain/product';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
 
  public products:Product[];

  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.findAll();

  }
  findAll():void{
    this.productService.findAll().subscribe(data=>{
      this.products=data;
    },error=>{
      console.error(error);
    })
  } 
}
