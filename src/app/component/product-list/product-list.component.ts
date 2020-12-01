import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public title: string='Lista de Productos'
  public products: Product[];

  public showMsg: boolean = false;
  public mensajes: string[] = [""];

  constructor(public productService:ProductService) { }

  ngOnInit(): void {

    this.findAll();
  }

  findAll(): void{
    this.productService.findAll().subscribe(data=>{
      this.products=data;
    },error=>{
      console.error(error);
    });
  }
  public delete(productId:string): void {
    this.productService.delete(productId).subscribe(ok => {
      alert("Producto eliminado exitosamente");
      this.findAll();
    }, err => {
      console.log(err)
      alert(err.error.error);

    });
  }

}
