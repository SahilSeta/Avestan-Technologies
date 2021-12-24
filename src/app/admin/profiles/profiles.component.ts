import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  data : any;
  constructor(private profileService : ProfileService, private toastr : ToastrService) {
    this.getAllProfiles();
   }

  ngOnInit(): void {
  }
  getAllProfiles(){
    this.data = []
    console.log(this.data);
    this.profileService.getProfiles().subscribe(
      (res) => {
        console.log(res);
        this.data = res.data;
        console.log(this.data);
      },
      (error) => {
        console.log(error)
      }
    );
  }
  deleteProduct(id : any){
    console.log(id)
    this.profileService.deleteProfile(id).subscribe(
      (res) => {
          this.getAllProfiles();
          this.toastr.success('Deleted', "Successfully!")
      }
    );
  }

}
