import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonFunction } from 'src/app/common';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  signupForm : FormGroup;
  validationMessages : any;
  formErrors : any = {
    username: '',
    email : '',
    password: ''
  };
  profileID : any;
  constructor(private fb : FormBuilder, private router : Router, private authService : AuthService,
    private actRoute : ActivatedRoute, private profileService : ProfileService, private toastr : ToastrService) {
    this.profileID = this.actRoute.snapshot.params['id'];
    console.log(this.profileID)
    this.getUserDetails(this.profileID)
    this.signupForm = this.fb.group({
      username: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
        ]),
      ],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
        ]),
      ],
      password: [
        null,
        Validators.compose([Validators.required]),
      ],
      photo: [null]
    });
    this.validationMessages = {
      username: {
        required: `Please Enter Username`,
        maxLength: `Maximum 100 characters allowed.`
      },
      email: {
        required: `Please Enter Email Address`,
        email: `Please check the Email Address.`
      },
      password: {
        required: `Please Enter password`
      }
    };
  }

  ngOnInit(): void {
  }
  getUserDetails(id : any){
    this.profileService.getProfileById(id).subscribe(
      (response) => {
        console.log(response)
        this.signupForm.patchValue({
          username : response.data.username,
          email : response.data.email,
        })
      }
    );
  }
  submitLoginForm( formdata : any ) {
    console.log(formdata)
    this._generateErrors();
    if(formdata.valid){
      let maindata = formdata.value;
      this.profileService.updateProfile(this.profileID, maindata).subscribe(
        (res) => {
          console.log(res)
          if(res.success == true){
            this.toastr.success('Profile Updated!!')
            this.router.navigateByUrl('/admin/profiles');
          }

        }
      );
    }

  }

  // ERROR GENERATIONS
  private _generateErrors() {
    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // Set errors for fields not inside datesGroup
        // Clear previous error message (if any)
        this.formErrors[field] = '';
        CommonFunction._setErrMsgs(this.signupForm.get(field), this.formErrors, field, this.validationMessages);
      }
    }
  }
}
