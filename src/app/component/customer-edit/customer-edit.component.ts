import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { Role } from 'src/app/domain/rol';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';
import { RoleService } from 'src/app/service/rol-service.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  //Id de customer
  public email: string;
  public customer: Customer;

  public enables: Enable[];
  public roles: Role[];

  public showMsg: boolean = false;
  public mensajes: string[] = [""];

  constructor(public router: Router,
    public activedRouter: ActivatedRoute, public customerService: CustomerService,
    public enableService: EnableService, public roleService:RoleService, public auth: AngularFireAuth) { }

  ngOnInit(): void {
    let params = this.activedRouter.params['_value'];
    this.email = params.email;

    this.customer = new Customer("", "", "Y", "", "", "", "A");
    
    this.findById();
    this.findAllEnable();
    this.findAllRole();
  }

  public findById(): void {
    this.customerService.findById(this.email).subscribe(data => {
      this.customer = data;
      console.table(this.customer);
    })
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }
  public findAllRole(): void {
    this.roles= this.roleService.findAll();
   }

  public update(): void {
    this.customerService.update(this.customer).subscribe(ok => {
      alert("customer editado exitosamente");
      this.router.navigate(['/customer-list']);
    }, err => {
      alert(err.erro.error);
    });
  }
  public delete(): void {
    this.customerService.delete(this.customer.email).subscribe(ok => {
      alert("Customer elimando exitosamente")
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
