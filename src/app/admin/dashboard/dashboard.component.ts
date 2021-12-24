import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalProfiles : any;
  constructor(private profileService : ProfileService) {
    this.getProfileData()
   }

  ngOnInit(): void {
  }
  getProfileData(){
    this.profileService.getProfiles().subscribe(
      (res) => {
        console.log(res.data);
        let data = res.data;
        this.totalProfiles = data.length;
      }
    )
  }
}
