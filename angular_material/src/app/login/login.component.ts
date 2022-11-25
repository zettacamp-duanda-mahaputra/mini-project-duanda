import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { LoginService } from './login.service';

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

  constructor(private loginService: LoginService, private router: Router, private authService: AuthService) { }

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
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Login Success'
    })
    this.router.navigate(['Homepage']).then(() => {
      window.location.reload();
    });
  }

  errorHandler(error: any) {
    Swal.fire('Failed', 'Not Completed', 'error');

  }
}
