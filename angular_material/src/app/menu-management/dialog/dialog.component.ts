import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MenuManagementComponent } from '../menu-management.component';
import { StockManagementService } from 'src/app/stock-management/stock-management.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  
  myForm = new FormGroup({
    recipe_name: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required,Validators.min(1)]),
    image: new FormControl(null,Validators.required),
    ingredients: new FormArray([]),
  });

  stockIngredient: any;

  constructor(
    public dialogRef: MatDialogRef<MenuManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stockManagementService: StockManagementService
  ) {}

  ngOnInit(): void {

    
    this.stockManagementService.getAllIngredients().subscribe((result) => {
      this.stockIngredient = result.data;
    });

    if (this.data) {      
      const data: any = {};

      for (let item of Object.entries(this.data)) {
        const [key, value]: any = item;

        if (key == 'recipe_name') {
          data.recipe_name = value;
        }

        if (key == 'price') {
          data.price = value;
        }

        if (key == 'image') {
          data.image = value;
        }

        if (key == 'ingredients') {
          data.ingredients = value.map((ing: any) => {
            this.addIngredients();

            return {
              stock_used: ing?.stock_used,
              ingredient_id: ing?.ingredient_id?._id,
            };
          });
        }
      }
      console.log(data);

      this.myForm.patchValue(data);
    } else {
      this.myForm.patchValue(this.data);
    }
  }

  get ingredientsForms() {
    return this.myForm.get('ingredients') as FormArray;
  }

  addIngredients() {
    const group = new FormGroup({
      ingredient_id: new FormControl(null, Validators.required),
      stock_used: new FormControl(null, Validators.required),
    });
    this.ingredientsForms.push(group);
  }

  removeForm(index: number) {
    this.ingredientsForms.removeAt(index);
  }

  onClose() {
    const value: any = {
      ...this.myForm.value,
    };

    const isValid = this.myForm.valid;

    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Data not Completed',
      });
    } else {
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
