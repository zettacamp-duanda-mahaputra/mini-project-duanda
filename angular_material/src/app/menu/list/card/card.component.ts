import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/cart/cart.service';
import Swal from 'sweetalert2';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() items: any
  data: any
  myForm: any = FormGroup;
  avail: any;

  form() {
    this.myForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.max(this.avail), Validators.min(1)])
    })
  }


  constructor(public dialog: MatDialog, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.get().subscribe((data: any) => {
      this.data = data

    })

    const a = {
      available: this.items?.available,
    };
    this.avail = a.available;
    console.log(this.avail);


    this.form();
  }



  openDialog(data: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
      width: '500px',
      height: '700px'
    })
    console.log(data._id);
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);

      let a: any = this.myForm.get('amount')?.value;
      let b: any = this.avail;

      if (a <= b) {
        const value: any = {
          addToCartId: this.items?._id,
          ...this.myForm.value,
        };

        console.log(value);

        this.cartService.add(value).subscribe((data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Menu added',
          })
          this.myForm.reset()
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Amount not valid'
      });
    }
  }




}
