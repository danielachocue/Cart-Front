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
import { EmailComponent } from './component/email/email.component';
//import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

const redirectUnauthorizedToLogin=()=>redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {path:'customer-list',component:CustomerListComponent,canActivate:[AuthGuard,AdminguardGuard]},
  {path:'customer-save',component:CustomerSaveComponent,canActivate:[AuthGuard,AdminguardGuard]},
  {path:'customer-edit/:email',component:CustomerEditComponent,canActivate:[AuthGuard,AdminguardGuard]},
  {path:'product-list',component:ProductListComponent, canActivate:[AuthGuard,AdminguardGuard]},
  {path:'product-save',component:ProductSaveComponent, canActivate:[AuthGuard,AdminguardGuard]},
  {path:'product-edit/:proId',component:ProductEditComponent, canActivate:[AuthGuard,AdminguardGuard]},
  {path:'paymenmethod-list',component:PaymenmethodListComponent, canActivate:[AuthGuard,AdminguardGuard]},
  {path:'paymenmethod-save',component:PaymenmethodSaveComponent, canActivate:[AuthGuard,AdminguardGuard]},
  {path:'paymenmethod-edit/:payId',component:PaymenmethodEditComponent, canActivate:[AuthGuard,AdminguardGuard]},
  {path: 'login',component:LoginComponent, canActivate: [AuthGuard, LogGuardGuard]},
  {path: '',component:LoginComponent},
  { path:'**',pathMatch:'full',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
