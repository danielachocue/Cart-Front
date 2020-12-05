import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import { LoginComponent } from './component/login/login.component';
import { PaymenmethodEditComponent } from './component/paymenmethod-edit/paymenmethod-edit.component';
import { PaymenmethodListComponent } from './component/paymenmethod-list/paymenmethod-list.component';
import { PaymenmethodSaveComponent } from './component/paymenmethod-save/paymenmethod-save.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductSaveComponent } from './component/product-save/product-save.component';

import {AngularFireAuthGuard,redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { AuthGuard } from './guard/auth.guard';
import { AdminguardGuard } from './guard/adminguard.guard';
import { LogGuardGuard } from './guard/log-guard.guard';
import { TiendaComponent } from './component/tienda/tienda.component';
import { ShoppingProductListComponent } from './component/shopping-product-list/shopping-product-list.component';
import { ShoppingProductEditComponent } from './component/shopping-product-edit/shopping-product-edit.component';
import { ShoppingProductSaveComponent } from './component/shopping-product-save/shopping-product-save.component';
import { ShoppingCartListComponent } from './component/shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartSaveComponent } from './component/shopping-cart-save/shopping-cart-save.component';
import { ShoppingCartEditComponent } from './component/shopping-cart-edit/shopping-cart-edit.component';
import { DetalleCompraComponent } from './component/detalle-compra/detalle-compra.component';
//import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

const redirectUnauthorizedToLogin=()=>redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {path:'customer-list',component:CustomerListComponent,canActivate:[AuthGuard,AdminguardGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'customer-save',component:CustomerSaveComponent},
  {path:'customer-edit/:email',component:CustomerEditComponent,canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'product-list',component:ProductListComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'product-save',component:ProductSaveComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'product-edit/:proId',component:ProductEditComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'paymenmethod-list',component:PaymenmethodListComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'paymenmethod-save',component:PaymenmethodSaveComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'paymenmethod-edit/:payId',component:PaymenmethodEditComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'shopping-product-list',component:ShoppingProductListComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'shopping-product-edit/:shprId',component:ShoppingProductEditComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'shopping-product-save',component:ShoppingProductSaveComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'shopping-cart-list',component:ShoppingCartListComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'shopping-cart-save',component:ShoppingCartSaveComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'shopping-cart-edit/:carId',component:ShoppingCartEditComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},

  {path:'tienda',component:TiendaComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  {path:'detalle-compra/:email',component:DetalleCompraComponent, canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redirectUnauthorizedToLogin}},
  
  {path: 'login',component:LoginComponent},
  {path: '',component:LoginComponent},
  { path:'**',pathMatch:'full',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
