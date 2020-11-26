import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Email } from 'src/app/domain/email';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { User } from 'src/app/domain/user';
import { AuthService } from 'src/app/service/auth.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { CustomerService } from 'src/app/service/customer.service';
import { AuthFirebaseService } from 'src/app/service/firbase-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public shoppingCarts: ShoppingCart[] = [];
  public user: User;
  public em: Email = new Email("");
  public ema: string = "";
  public pass: string = "";
  public customer: Customer;
  public showMsg: boolean = false;
  public messages: string[] = [""];
  public crear: boolean = true;

  constructor(private router: Router, private authService: AuthService, private authFirebaseService: AuthFirebaseService,
    public customerService: CustomerService, public cartService: CartServiceService) { }

  ngOnInit(): void {
    this.user = new User("", "");
  }

  public ingresar(): void {

    this.authFirebaseService.loginFirebase(this.ema, this.pass).then(
      resp => {
        this.user.username = "admin";
        this.user.password = "password";
        this.authService.loginUser(this.user).subscribe(
          data => {
            if (resp.user.emailVerified) {
              localStorage.setItem("usuario", JSON.stringify(this.user));
              localStorage.setItem("token", data.token);
              this.customerService.findById(this.ema).subscribe(data => {
                this.customer = data;
                if (this.customer.enable == "Y") {
                  localStorage.setItem("rol", this.customer.role);
                  if (this.customer.role == "A") {
                    this.router.navigate(['/customer-list']);
                  } else {
                    this.cartService.findShcaByEmail(this.customer.email).subscribe(data => {
                      this.shoppingCarts = data;
                      this.em.email = this.customer.email;
                      console.table(this.shoppingCarts);
                      if (this.shoppingCarts == null) {
                        this.cartService.createCart(this.em).subscribe(
                          data => {
                            console.table("Nuevo: ", data);
                          }, error => {
                            console.log(error);
                          }
                        );
                        this.router.navigate(['/product-list']);
                      } else {
                        this.shoppingCarts.forEach(shca => {
                          if (shca.paymentMethodId == null) {
                            this.crear = false;
                          }
                        });
                        if (this.crear == true) {
                          this.cartService.createCart(this.em).subscribe(
                            data => {
                              console.table("Nuevo2: ", data);
                            }, error => {
                              console.log(error);
                            }
                          );
                        }
                        this.router.navigate(['/product-list']);
                      }
                    }, error => {
                      console.error(error);
                    });

                  }
                } else {
                  this.showMsg = true;
                  this.messages[0] = "Usuario inhabilitado";
                  localStorage.clear();
                }
              }, error => {
                this.showMsg = true;
                this.messages[0] = "Usuario no encontrado";
                localStorage.clear();
              })
            } else {
              this.router.navigate(['/email']);
            }
          }, err => {
            this.showMsg = true;
            this.messages[0] = "Usuario o clave no es válido";
          });
      }
    ).catch((error) => {
      this.showMsg = true;
      this.messages[0] = error.message;
    });

  }

}
