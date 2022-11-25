import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  carts: any = [];

  constructor(private cartService: CartService, private router:Router, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.cartService.get().subscribe((data: any) => {
      console.log(data);
      this.carts = data?.data?.getCart;
      console.log(this.carts);

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
            text: 'Out of Stock: ' + namaMenu
          })
          
        }else{
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Checkout Completed',
          }).then(() => {
            this.getAll()
          });
        }
      });
  }

  openDialog(data:any){
    const dialogRef = this.dialog.open(DialogComponent,{
      data: data,
      width:'500px'
    })
  }
}
