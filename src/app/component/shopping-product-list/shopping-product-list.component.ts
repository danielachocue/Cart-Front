import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-shopping-product-list',
  templateUrl: './shopping-product-list.component.html',
  styleUrls: ['./shopping-product-list.component.css']
})

export class ShoppingProductListComponent implements OnInit {
  
  public title:string='Lista de Shopping Products';
  public shoppingProducts:ShoppingProduct[];
  shprId:string;
  pageActual:number=1;

  constructor(public shoppingProductService:ShoppingProductService, public router: Router, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll():void{
    this.shoppingProductService.findAll().subscribe(data=>{
      this.shoppingProducts=data;
      this.shprId='';
    },error=>{
      console.error(error);
    })
  }

  findById(shprId:string):void{
    this.shoppingProductService.findById(shprId).subscribe(data=>{
      this.shoppingProducts=[];
      this.shoppingProducts.push(data);
    },error=>{
      console.error(error);
    })
  }

  delete(shprId:string):void{
    this.shoppingProductService.delete(shprId).subscribe(ok => {
      alert("Shopping product eliminado exitosamente");
    }, err => {
      alert(err.errors.errors);

    });

  }

  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.router.navigate(['/login'])
    
  }

}
