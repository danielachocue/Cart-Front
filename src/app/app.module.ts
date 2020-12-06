import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';

import{HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PaymenmethodListComponent } from './component/paymenmethod-list/paymenmethod-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';

import{FormsModule} from '@angular/forms';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { ProductSaveComponent } from './component/product-save/product-save.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { PaymenmethodSaveComponent } from './component/paymenmethod-save/paymenmethod-save.component';
import { PaymenmethodEditComponent } from './component/paymenmethod-edit/paymenmethod-edit.component';
import { LoginComponent } from './component/login/login.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { TiendaComponent } from './component/tienda/tienda.component';
import { ShoppingProductListComponent } from './component/shopping-product-list/shopping-product-list.component';
import { ShoppingProductEditComponent } from './component/shopping-product-edit/shopping-product-edit.component';
import { ShoppingProductSaveComponent } from './component/shopping-product-save/shopping-product-save.component';
import { ShoppingCartListComponent } from './component/shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartEditComponent } from './component/shopping-cart-edit/shopping-cart-edit.component';
import { ShoppingCartSaveComponent } from './component/shopping-cart-save/shopping-cart-save.component';
import { DetalleCompraComponent } from './component/detalle-compra/detalle-compra.component';
import { ListaComprasComponent } from './component/lista-compras/lista-compras.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    ProductListComponent,
    PaymenmethodListComponent,
    CustomerSaveComponent,
    CustomerEditComponent,
    ProductSaveComponent,
    ProductEditComponent,
    PaymenmethodSaveComponent,
    PaymenmethodEditComponent,
    LoginComponent,
    TiendaComponent,
    ShoppingProductListComponent,
    ShoppingProductEditComponent,
    ShoppingProductSaveComponent,
    ShoppingCartListComponent,
    ShoppingCartEditComponent,
    ShoppingCartSaveComponent,
    DetalleCompraComponent,
    ListaComprasComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    //Firebase Modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
