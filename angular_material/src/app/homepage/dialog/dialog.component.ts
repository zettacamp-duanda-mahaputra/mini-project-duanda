import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(public dialogRef:MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const value = {
      addToCartId: this.data._id,
      ...this.myForm.value
    };

    if(this.myForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Data not Completed',
      });
    }
    else {
      console.log(value);
      
      this.dialogRef.close(value);
    }
  }

  onCancel(){
    this.dialogRef.close()
  }

}
