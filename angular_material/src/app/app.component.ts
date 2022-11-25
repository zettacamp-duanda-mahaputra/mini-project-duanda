import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular_material';
  menus: any = [];
  isLogin: any
  role: any;
  

  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit() {
    this.role = this.authService.getRole()
    this.isLogin = this.authService.getToken()
    console.log(this.isLogin);
    
  }

  isLogout() {
   this.authService.clearUser()
    this.router.navigate(['Homepage']).then(() => {
      window.location.reload();
    });
  }

  onCart() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Cant Acces Cart Before Login',
    });
  }
}
