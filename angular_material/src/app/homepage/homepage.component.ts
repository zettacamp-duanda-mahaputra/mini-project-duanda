import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomepageService } from './homepage.service';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Aos from 'aos';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { CartService } from '../cart/cart.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  message: any = null;
  items: any
  specials: any
  user: any

  constructor(private homeService: HomepageService, private router: Router, private authService: AuthService, public dialog: MatDialog, private cartService: CartService) { }

  ngOnInit(): void {
    const user = this.authService.getUser()
    this.user = user

    this.homeService.get().subscribe((data: any) => {
      this.items = data?.data?.getAllRecipes.data
      Aos.init()
    })
    this.getSpecial()
    this.requestPermission()
    this.listen()
  }

  getSpecial() {
    this.homeService.getAll().subscribe((data: any) => {
      this.specials = data?.data?.getAllRecipes.data
    })
  }

  requestPermission() {
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then((currentToken) => {
      if (currentToken) {
        this.homeService.saveTokenFCM(currentToken).subscribe((data: any) => {
        })
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);

    });

  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.message = payload;
    });
  }

  onCart() {
    if (this.user) {
      this.router.navigate(['Cart'])
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Cant Acces Cart Before Login',
      }).then(() => {
        this.router.navigate(['Login'])
      })
    }
  }

  onMenu() {
    this.router.navigate(['Menu'])
  }

  openDialog(data:any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data || null
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.cartService.add(result).subscribe(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data Completed',
        })
      },err=>{
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: err.message
        })
      })
    })
  }

}
