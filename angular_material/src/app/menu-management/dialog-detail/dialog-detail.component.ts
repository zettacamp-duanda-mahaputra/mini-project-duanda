import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuManagementComponent } from '../menu-management.component';

@Component({
  selector: 'app-dialog-detail',
  templateUrl: './dialog-detail.component.html',
  styleUrls: ['./dialog-detail.component.css']
})
export class DialogDetailComponent implements OnInit {
  value: any
  ingredients: any = []
  finalIngredients: string[] = []
  theIngredients: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, public dialogRef: MatDialogRef<MenuManagementComponent>) { }

  ngOnInit(): void {
    if (this.data) {
      this.value = this.data
      this.ingredients.push(this.value.ingredients);

      for (let ingredient of this.ingredients){
        for (let ingre of ingredient) {
          this.finalIngredients.push(ingre.ingredient_id.name);
          this.theIngredients = this.finalIngredients.join(', ');
        }
      }      
    }
  }

  onClose(){
    this.dialogRef.close();
  }

}
