import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recuperarcontra',
  templateUrl: './recuperarcontra.component.html',
  styleUrls: ['./recuperarcontra.component.css']
})
export class RecuperarcontraComponent implements OnInit {

  public title: string = 'Recuperar Contraseña';
  
  email: string = '';
  public clientFirebase: Subscription =new Subscription
  constructor(public auth: AngularFireAuth, public router: Router) {}

  ngOnInit(): void {
    this.clientFirebase=this.auth.user.subscribe((userFirebase)=>{
      this.email = userFirebase.email;
   })
  }

  restore(): void {
    this.auth.sendPasswordResetEmail(this.email);
    alert("Verifica tu email para recuperar la contraseña");
    this.router.navigate(['/login']);
  }

}
