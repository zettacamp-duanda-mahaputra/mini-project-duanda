import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  isEdit: boolean = false;

  myForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    stock: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    if (this.data) {
      this.myForm.patchValue(this.data);
      this.myForm.controls['name'].disable();
    }
  }

  onClose() {
    const value: any = {};
    const isValid = this.myForm.valid;

    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Data not Completed',
      });
    } else {
      value.name = this.myForm.get('name')?.value;
      value.stock = this.myForm.get('stock')?.value;
  
      if (this.data) {
        value._id = this.data._id;
      }
  
      this.dialogRef.close(value);
     
    }

  
  }

  onCancel(){
    this.dialogRef.close();
  }
}
