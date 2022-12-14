import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-special',
  templateUrl: './dialog-special.component.html',
  styleUrls: ['./dialog-special.component.css']
})
export class DialogSpecialComponent implements OnInit {
  discount = new FormControl(null, [Validators.max(100), Validators.min(0),Validators.pattern(/^\d+$/)])

  constructor(public dialogRef: MatDialogRef<DialogSpecialComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    if(this.data){
      this.discount.patchValue(this.data.disc)
    }
  }

  onSubmit(){
    if(this.discount.valid){
      const val = {
        ...this.data,
        discount: this.discount.value 
      }
      this.dialogRef.close(val)
    }else{
      Swal.fire({
        icon: 'error',
        title:'Failed'
      })
    }
    
  }

  onCancel(){
    this.dialogRef.close()
  }

}
