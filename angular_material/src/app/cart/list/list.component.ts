import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/login/login.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  carts: any = [];
  credit:any

  constructor(private cartService: CartService, private router:Router, private dialog:MatDialog, private loginService:LoginService, private appComponent:AppComponent) {}

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.cartService.get().subscribe((data: any) => {
      this.carts = data?.data?.getCart;
    })
  }


  onCheckOut() {

      this.cartService.order(this.carts._id).subscribe((data:any) => {
        if (data.data.order.order_status == "failed") {

          let namaMenu = ''
          let menu = data.data.order.menu
          for(let value of menu){
            if (value.status_recipe == "outOfStock") {
              namaMenu = namaMenu+''+value.recipe_id.recipe_name
            }
          }

          Swal.fire({
            icon: 'error',
            title:'Failed',
            text: 'Not Available: ' + namaMenu
          })
          
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Checkout Completed',
          }).then(() => {
            this.loginService.getCredit().subscribe((data:any)=>{              
              this.appComponent.balances = data.data.getBalanceCredit
            })
            this.getAll()
          });
        }
      }, err=>{
        Swal.fire({
          icon: 'error',
          title:'Failed',
          text: err.message
        })
      });
  }

  openDialog(data:any){
    const dialogRef = this.dialog.open(DialogComponent,{
      data: data,
      width: '800px'
    })
  }
}
