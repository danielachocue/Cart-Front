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
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'customer-list',component:CustomerListComponent,canActivate:[AuthGuard]},
  {path:'customer-save',component:CustomerSaveComponent,canActivate:[AuthGuard]},
  {path:'customer-edit/:email',component:CustomerEditComponent,canActivate:[AuthGuard]},
  {path:'product-list',component:ProductListComponent},
  {path:'product-save',component:ProductSaveComponent},
  {path:'product-edit/:proId',component:ProductEditComponent},
  {path:'paymenmethod-list',component:PaymenmethodListComponent},
  {path:'paymenmethod-save',component:PaymenmethodSaveComponent},
  {path:'paymenmethod-edit/:payId',component:PaymenmethodEditComponent},
  {path: 'login',component:LoginComponent},
  {path: '',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
