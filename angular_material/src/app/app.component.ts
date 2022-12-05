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
  selectedLang:any
  public balances:any
  

  constructor(private router: Router, private authService:AuthService, private translate:TranslateService, private loginService:LoginService) {}

  ngOnInit() {
    this.role = this.authService.getRole()
    this.isLogin = this.authService.getToken()

    this.getBalance()
  }

  getBalance(){
    this.loginService.getCredit().subscribe((data:any)=>{
      this.balances = data?.data?.getBalanceCredit      
    })
  }

  isLogout() {
   this.authService.clearUser()
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
      )
      this.router.navigate(['Homepage']).then(() => {
        window.location.reload();
      });
    }
  }) 
  }

  onCart() {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Cant Acces Cart Before Login',
    });
  }

  setLang(event:any){
    if(event.checked == true){
      this.selectedLang = 'id'
    }else{
      this.selectedLang = 'en'
    }
    this.translate.use(this.selectedLang)
  }
}
