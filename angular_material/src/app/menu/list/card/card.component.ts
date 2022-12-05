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



  constructor(public dialog: MatDialog, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.get().subscribe((data: any) => {
      this.data = data

    })
  }



  openDialog(data: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
      width: '500px',
      height: '700px'
    })
  }

  




}
