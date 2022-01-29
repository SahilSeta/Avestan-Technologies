import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userdata : any;
  constructor(private jwtService : JwtService) {
    this.getProfileData();
   }

  ngOnInit(): void {
  }
  getProfileData () {
    this.userdata = this.jwtService.getUser();
    console.log(this.jwtService.getUser())
  }

}
