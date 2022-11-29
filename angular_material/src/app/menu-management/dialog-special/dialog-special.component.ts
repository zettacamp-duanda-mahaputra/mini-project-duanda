import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuManagementComponent } from '../menu-management.component';

@Component({
  selector: 'app-dialog-special',
  templateUrl: './dialog-special.component.html',
  styleUrls: ['./dialog-special.component.css']
})
export class DialogSpecialComponent implements OnInit {
  discount = new FormControl(null)

  constructor(public dialogRef: MatDialogRef<MenuManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const val = {
      ...this.data,
      discount: this.discount.value 
    }
    this.dialogRef.close(val)
  }

  onCancel(){
    this.dialogRef.close()
  }

}
