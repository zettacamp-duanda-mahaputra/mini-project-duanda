import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { LoginService } from './login/login.service';

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
  userid: any
  selectedLang: any
  public balances: any


  constructor(private router: Router, private authService: AuthService, private translate: TranslateService, private loginService: LoginService) { }

  ngOnInit() {
    this.role = this.authService.getRole()
    this.isLogin = this.authService.getToken()
    this.userid = this.authService.getUserId()
    this.balances = this.authService.getBalance()
  }



  isLogout() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logout!',
          'You has been logout.',
          'success'
        ).then(() => {
          this.router.navigate(['Homepage']).then(() => {
            this.authService.clearUser()
            localStorage.clear()
            window.location.reload()
          });
        })

      }
    })
  }



  setLang(event: any) {
    if (event.checked == true) {
      this.selectedLang = 'id'
    } else {
      this.selectedLang = 'en'
    }
    this.translate.use(this.selectedLang)
  }

  onCart() {
    if (!this.isLogin) {
      Swal.fire({
        icon: 'info',
        text: 'Need login before access cart'
      })
    }
  }
}
