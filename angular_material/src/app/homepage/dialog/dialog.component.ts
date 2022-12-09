import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  myForm = new FormGroup({
    amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    note: new FormControl(null)
  })

  isLogin: any

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.isLogin = this.authService.getToken()
  }

  onSubmit() {
    if (!this.isLogin) {
      const val: any = {
        addToCartId: this.data._id,
        ...this.myForm.value,
      };

      Swal.fire({
        title: 'Do you have an account?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes, Login',
        denyButtonText: `No, Register`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'info',
            text: 'Please Login to complete your transaction'
          })
          this.router.navigate(['Login']).then(() => {
            localStorage.setItem('addCart', JSON.stringify(val))
          })
          this.dialogRef.close(val)
        }
        else if (result.isDenied) {
          Swal.fire({
            icon: 'info',
            text: 'Please register to complete your transaction'
          })
          this.router.navigate(['/Register/RegisterUser']).then(() => {
            localStorage.setItem('addCart', JSON.stringify(val))
          })
          this.dialogRef.close(val)
        }
      })
    }
    else {
      if (this.myForm.valid) {


        const val: any = {
          addToCartId: this.data._id,
          ...this.myForm.value,
        };

        this.cartService.add(val).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Menu added',
          });
        }, err => {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: err.message
          });
        })
        this.dialogRef.close(val)

      } else {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'data not completed'
        });
      }
    }
    


  }

  onCancel() {
    this.dialogRef.close()
  }

}
