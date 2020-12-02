import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { shoppingProductModel } from 'src/app/modelos/shoppingProdcutModel';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-shopping-product-edit',
  templateUrl: './shopping-product-edit.component.html',
  styleUrls: ['./shopping-product-edit.component.css']
})
export class ShoppingProductEditComponent implements OnInit {

  title:string='Edicion de Shopping Product';
  shprs = new shoppingProductModel();
  constructor(private shoppingProductService:ShoppingProductService,private routActive:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.loadCustomer();

  }
  loadCustomer():void{
    this.routActive.params.subscribe(resp=>{
      let payId =resp['shprId'];
      if(payId){
        this.shoppingProductService.findById(payId).subscribe((data)=>{
          this.shprs=data;
        })
      }
    })
  }
  update(){
    this.shoppingProductService.update(this.shprs).subscribe((rsp)=>{
      alert("Se modifico exitosamente shopping Product");
      this.router.navigate(['/shopping-product-list']);
    },err=>{
      console.log(err);
    });
      }

}
