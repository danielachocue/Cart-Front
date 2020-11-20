import { Component, OnInit } from '@angular/core';
import { Enable } from 'src/app/domain/enable';
import { Product } from 'src/app/domain/product';
import { EnableService } from 'src/app/service/enable.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-save',
  templateUrl: './product-save.component.html',
  styleUrls: ['./product-save.component.css']
})
export class ProductSaveComponent implements OnInit {

  public product:Product;
  public enables:Enable[];

  public showMsg: boolean= false;
  public mensajes: string[]= [""];

  //inyeccion de dependencia
  constructor(public productService:ProductService,
              public enableService:EnableService) { }

  ngOnInit(): void {
    this.product=new Product("","","Y","","",0);
    this.findAllEnable();
  }

  public findAllEnable():void{
    this.enables=this.enableService.findAll();
  }

  public save():void{
    this.mensajes=[""];
    this.productService.save(this.product).subscribe(ok=>{
      this.showMsg=true;
      this.mensajes[0]="El product se grabo con exito";
    },err=>{
      console.log(err);
      this.showMsg=true;
      this.mensajes=err.error.error;
      
    });
  }
}
