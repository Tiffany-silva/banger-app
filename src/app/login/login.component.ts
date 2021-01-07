import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  isSuccessful: boolean;
  errorMessage: any;
  isLoggedIn: boolean;
  isLoginFailed: boolean;
  role: any;
  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.createForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }


  getError(el: any) {
    switch (el) {
      case 'email':
        if (this.formGroup.get('email').hasError('required')) {
          return 'Username required';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
    return '';
  }

  onSubmit(post: any) {
        const user={
          'email':post.email,
          'password': post.password
        }
      this.authService.login(user).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = JSON.parse(this.tokenStorage.getUser()).role;
          this.isSuccessful = true;
          if(this.role==="clerk"){
            this.router.navigate(['/clerk-home']);
          }else if(this.role==="hirer"){
            this.router.navigate(['/home']);

          }
        },
        err => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage)
          this.isLoginFailed = true;
        }
      );
  }
}
