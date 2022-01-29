import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonFunction } from 'src/app/common';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup;
  validationMessages : any;
  formErrors : any = {
    username: '',
    email : '',
    password: ''
  };
  constructor(private fb : FormBuilder, private jwtService : JwtService, private router : Router, private authService : AuthService, private toastr: ToastrService) {
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

  submitLoginForm( formdata : any ) {
    //console.log(formdata)
    this._generateErrors();
    if(formdata.valid){
      let maindata = formdata.value;
      this.authService.signUpProcess(maindata).subscribe(
        (res) => {
          console.log(res)
          if(res.success){
            this.jwtService.saveToken(res.token);
            let userprofile = {
              username : res.data.username,
              email : res.data.email,
              id : res.data._id,
              isDeleted : res.data.isDeleted,
              password : res.data.password
            }
            console.log(userprofile)
            this.jwtService.saveUser(userprofile)
           this.router.navigateByUrl('/admin/dashboard');
          }else if(!res.success){
            this.toastr.error(res.error);
          }

        },(err) => {
          //console.log(err)
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
