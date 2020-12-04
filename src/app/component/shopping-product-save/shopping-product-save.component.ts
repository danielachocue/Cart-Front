import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { shoppingProductModel } from 'src/app/modelos/shoppingProdcutModel';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-shopping-product-save',
  templateUrl: './shopping-product-save.component.html',
  styleUrls: ['./shopping-product-save.component.css']
})
export class ShoppingProductSaveComponent implements OnInit {
  title:string='New Shopping Product';
  shprs = new shoppingProductModel();
  constructor(private ShoppingProductService:ShoppingProductService,private route:Router) { }

  ngOnInit(): void {
  }
  
  save(): void {
    this.ShoppingProductService.save(this.shprs).subscribe((rsp) => {
      alert("Se guardo exitosamente el Shopping Product");
      console.log(this.shprs);
      this.route.navigate(['/shopping-product-list']);
    }); 
  }
}
