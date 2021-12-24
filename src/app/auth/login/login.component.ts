import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonFunction } from 'src/app/common';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  validationMessages : any;
  formErrors : any = {
    username: '',
    password: ''
  };
  constructor(private fb : FormBuilder, private jwtService : JwtService, private router : Router, private authService : AuthService, private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),
        ]),
      ],
      password: [
        null,
        Validators.compose([Validators.required]),
      ]
    });
    this.validationMessages = {
      username: {
        required: `Please Enter Username`,
        maxLength: `Maximum 100 characters allowed.`
      },
      password: {
        required: `Please Enter password`
      }
    };
  }

  ngOnInit(): void {
  }

  submitLoginForm( formdata : any ) {
    console.log("formdata",formdata.value)
    this._generateErrors();
    if(formdata.valid){
      let userdata = formdata.value;
      this.authService.checkUser(userdata).subscribe(
        (response)=> {
          console.log("response",response);
          if(response.success == true){
            console.log("response",response);
            this.toastr.success('Logged IN', 'Login successful!');
            this.jwtService.saveToken(response.token);
            let userprofile = {
              username : response.data.username,
              email : response.data.email,
              id : response.data._id,
              isDeleted : response.data.isDeleted,
              password : response.data.password
            }
            console.log(userprofile)
            this.jwtService.saveUser(userprofile)
            this.router.navigateByUrl('/admin/dashboard');
          }
        },
        (error) => {
          console.log(error)
          this.toastr.error('Oops', error.error);

        }
      );

    }
    //let data = this.jwtService.getToken();
    //console.log("token",data)
    // if(data){
    //   //
    // }
  }

  // ERROR GENERATIONS
  private _generateErrors() {
    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // Set errors for fields not inside datesGroup
        // Clear previous error message (if any)
        this.formErrors[field] = '';
        CommonFunction._setErrMsgs(this.loginForm.get(field), this.formErrors, field, this.validationMessages);
      }
    }
  }
}
