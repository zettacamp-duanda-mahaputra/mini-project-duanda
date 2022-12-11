import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { LoginService } from './login.service';
import { CartService } from './../cart/cart.service'
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private appComponent: AppComponent, private loginService: LoginService, private router: Router, private authService: AuthService, private cartService: CartService) { }
  hide = true;
  ngOnInit(): void { }

  

  onSubmit() {
    const value = this.myForm.value;

    this.loginService.getToken(value).subscribe({
      next: (data) => this.successHandler(data),
      error: (error) => this.errorHandler(error)
    })

  }

  successHandler(data: any) {
    this.authService.setUser(data.data.loginUser)
    this.appComponent.isLogin = data.data.loginUser.token
    this.appComponent.role = data.data.loginUser.userType.role
    this.appComponent.userid = data.data.loginUser._id 
    this.appComponent.balances = data.data.loginUser.credit
    console.log(this.appComponent.balances);
    

    let addCart: any = localStorage.getItem('addCart')
    addCart = JSON.parse(addCart)
    localStorage.removeItem('addCart')
    if (addCart) {
      this.cartService.add(addCart).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Login Success'
        }).then(()=>{
          this.router.navigate(['Cart']).then(() => {
            this.appComponent.balances
          });
        })
      })
    }
    else {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login Success'
      }).then(() => {
        localStorage.removeItem('addCart')
        this.router.navigate(['Homepage']).then(() => {
          this.appComponent.balances
        });
      })

    }
  }

  errorHandler(error: any) {
    Swal.fire('Failed', 'Not Completed', 'error');
  }

  onForgot(){
    this.router.navigate(['ForgotPassword'])
  }

  onSignUp(){
    this.router.navigate(['/Register/RegisterUser'])
  }
}
