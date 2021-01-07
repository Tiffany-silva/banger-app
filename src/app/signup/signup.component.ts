import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Hirer } from '../entity.Models/hirer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Clerk } from '../entity.Models/clerk';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // public registerForm!: FormGroup;
  isSuccessful = false;
  // isSignUpFailed = false;
  errorMessage = '';


  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { 
  //  let clerk=new Clerk();
  //  clerk.email="john@gmail.com";
  //  clerk.password="Qwerty123";
  //  this.authService.registerClerk(clerk).subscribe(data=>{
  //    console.log("registered clerk" + data);
  //  })

  }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
       date: [new Date()],
      'password': [null, [Validators.required, this.checkPassword]],
      'address': [null, [Validators.required, Validators.minLength(5)]],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('firstName').setValidators([Validators.required, Validators.minLength(3)]);
          this.formGroup.get('lastName').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('firstName').setValidators(Validators.required);
          this.formGroup.get('lastName').setValidators(Validators.required);

        }
        this.formGroup.get('firstName').updateValueAndValidity();
        this.formGroup.get('firstName').updateValueAndValidity();

      }
    )
  }

  get firstName() {
    return this.formGroup.get('firstName') as FormControl
  }
  get lastName() {
    return this.formGroup.get('lastName') as FormControl
  }

  checkPassword(control:any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control:any) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  // onSubmit(post: any) {
  //   this.post = post;
  // }

  onSubmit(post:any): void {
    console.log(post);
        const hirer = new Hirer();
        hirer.address=post.address;
        hirer.firstName=post.firstName;
        hirer.lastName=post.lastName;
        hirer.dob=post.date;
        hirer.email=post.email;
        hirer.password=post.password;
      this.authService.registerHirer(hirer).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.router.navigate(['/login']);
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    }


}
