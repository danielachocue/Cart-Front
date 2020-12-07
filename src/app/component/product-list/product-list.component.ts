import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
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

  constructor(public productService:ProductService,public auth: AngularFireAuth,public router: Router) { }

  ngOnInit(): void {

    this.findAll();
  }

  findAll(): void{
    this.productService.findAll().subscribe(data=>{
      this.products=data;
    },error=>{
      alert(error.error.errors);
    });
  }
  public delete(proId:string): void {
    this.productService.delete(proId).subscribe(ok => {
      alert("Producto eliminado exitosamente");
      this.findAll();
    }, err => {
      console.log(err.error.error);

    });
  }

  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.router.navigate(['/login'])
    
  }

}
