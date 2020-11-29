import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFirebaseService } from 'src/app/service/firbase-service.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  public userF$:Observable<any>=this.authFirebaseService.afAuth.user;

  constructor(private authFirebaseService: AuthFirebaseService) { }

  ngOnInit(): void {
  }

  sendVerificationEmail(){
    this.authFirebaseService.sendVerificationEmail().then(
    ).catch((error)=>{
    });
  }

}
