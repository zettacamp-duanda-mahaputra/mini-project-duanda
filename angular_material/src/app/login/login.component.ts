import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { LoginService } from './login.service';
import { CartService } from './../cart/cart.service'

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

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService, private cartService: CartService) { }
  hide = true;
  ngOnInit(): void { }

  get(): any {
    this.loginService.getCredit().subscribe(() => { })
  }

  onSubmit() {
    const value = this.myForm.value;

    this.loginService.getToken(value).subscribe({
      next: (data) => this.successHandler(data),
      error: (error) => this.errorHandler(error)
    })

  }

  successHandler(data: any) {
    this.authService.setUser(data.data.loginUser)

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
            window.location.reload();
            this.get()
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
          window.location.reload();
          this.get()
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
