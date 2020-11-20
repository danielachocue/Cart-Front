import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enable } from 'src/app/domain/enable';
import { Product } from 'src/app/domain/product';
import { EnableService } from 'src/app/service/enable.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public proId: string
  public product: Product;

  public enables: Enable[];

  public showMsg: boolean = false;
  public mensajes: string[] = [""];

  constructor(public router: Router,
    public activeRouter: ActivatedRoute, public productService: ProductService,
    public enableService: EnableService) { }

  ngOnInit(): void {
    let params = this.activeRouter.params['_value'];
    this.proId = params.proId;

    this.findById();
    this.findAllEnable();
  }

  public findById(): void {
    this.productService.findById(this.proId).subscribe(data => {
      this.product = data;
      console.table(this.product);
    })
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public update(): void {
    this.mensajes = [""];
    this.productService.update(this.product).subscribe(ok => {
      this.showMsg = true;
      this.mensajes[0] = "El producto se modifico con exito" + this.proId;
    }, err => {
      console.log(err)
      this.showMsg = true;
      this.mensajes = err.error.error;

    });
  }

  public delete(): void {
    this.mensajes = [""];
    this.productService.delete(this.product.proId).subscribe(ok => {
      this.showMsg = true;
      this.mensajes[0] = "El producto se borro con exito" + this.proId;
    }, err => {
      console.log(err)
      this.showMsg = true;
      this.mensajes = err.error.error;

    });
  }

}
