import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userName:string =''
  constructor(private _auth: AuthService){
    _auth.userData.subscribe((data)=>{
      this.userName = data.name
    })
  }

}
