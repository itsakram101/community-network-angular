import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequestPayload : SignupRequestPayload
  signupForm: FormGroup;

  constructor(private authservice: AuthService) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
   }

  ngOnInit(): void {
    this.signupForm = new FormGroup({

      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authservice.signup(this.signupRequestPayload)
        .subscribe(data => {
          console.log(data);  
        })
  }
}
