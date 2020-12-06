import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { Role } from 'src/app/domain/rol';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';
import { RoleService } from 'src/app/service/rol-service.service';

@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit {

  public customer: Customer;
  public enables: Enable[];
  public role: Role[];

  public showMsg: boolean = false;
  public mensajes: string[] = [""];

  //inyeccion de dependencia
  constructor(public router:Router,public customerService: CustomerService,
    public enableService: EnableService, public authService: AuthService, public roleService:RoleService,public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.customer = new Customer("", "", "Y", "", "", "", "A");
    this.findAllEnable();
    this.findAllRole();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public findAllRole(): void {
   this.role= this.roleService.findAll();
  }

  public save(): void {
    this.customerService.save(this.customer).subscribe(ok => {
     alert("Se grabo el usuario con exito");
     this.authService.createUser(this.customer.email,this.customer.token)
     .then((data)=>{
       alert("Revisa tu correo para confirmarlo email")
       this.authService.sendEmailVerification();
       this.customer.token=data.user.uid;
       this.customerService.update(this.customer).subscribe(ok=>{
         this.router.navigate(['/login']);
       }, err=>{
         alert(err.error.error);
       });
     }) .catch(e=>{
       alert(e.message);
     })
    }, err => {
        alert(err.error.error);

    });
  }
  logout() {
    this.auth.signOut();
    localStorage.clear()
    this.router.navigate(['/login'])
    
  }
}
