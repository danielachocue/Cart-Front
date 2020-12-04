import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shoppingProductModel } from 'src/app/modelos/shoppingProdcutModel';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-shopping-product-save',
  templateUrl: './shopping-product-save.component.html',
  styleUrls: ['./shopping-product-save.component.css']
})
export class ShoppingProductSaveComponent implements OnInit {
  title:string='New Shopping Product';
  shprs = new shoppingProductModel();
  constructor(private ShoppingProductService:ShoppingProductService,private route:Router,private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  }
  
  save(): void {
    this.ShoppingProductService.save(this.shprs).subscribe((rsp) => {
      alert("Se guardo exitosamente el Shopping Product");
      console.log(this.shprs);
      this.route.navigate(['/shopping-product-list']);
    }); 
  }

  addProduct():void{
    this.shoppingCartService.addProduct(this.shprs.shoppingCartId,this.shprs.productId,this.shprs.quantity).subscribe((rsp)=>{
      this.route.navigate(['/shoppingProduct'])

    })
  }
}
