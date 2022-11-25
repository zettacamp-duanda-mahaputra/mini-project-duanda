import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { CartModule } from 'src/app/cart/cart.module';
import { CartService } from 'src/app/cart/cart.service';
import Swal from 'sweetalert2';
import { MenuComponent } from '../menu.component';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
    carts: any;
    ingredients: any = [];
    finalIngredients: string[] = [];
    bismillahIngredients: any;
    myForm: any = FormGroup;
    avail: any;

    form() {
        this.myForm = new FormGroup({
            amount: new FormControl(null, [
                Validators.max(this.avail),
                Validators.required,
                Validators.min(1),
            ]),
            note: new FormControl(null),
        });
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        public dialogRef: MatDialogRef<MenuComponent>,
        private cartService: CartService,
    ) { }

    ngOnInit(): void {
        if (this.data) {
            this.carts = this.data;
            this.ingredients.push(this.carts.ingredients);

            for (let ingredient of this.ingredients)
                for (let ingre of ingredient) {
                    this.finalIngredients.push(ingre.ingredient_id.name);
                    this.bismillahIngredients = this.finalIngredients.join(', ');
                }
        }
        const a = {
            available: this.carts.available,
        };
        this.avail = a.available;

        this.form();
    }

    onSubmit() {
        if (this.myForm.valid) {
            console.log(this.myForm.value);

            let a: any = this.myForm.get('amount')?.value;
            let b: any = this.carts.available;

            if (a <= b) {
                const value: any = {
                    addToCartId: this.data._id,
                    ...this.myForm.value,
                };

                console.log(value);

                this.cartService.add(value).subscribe({
                    next: (data) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Menu added',
                        });
                    },
                    error: (error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: error.message,
                        });
                    },
                });
            }
        }
    }

    onCancel() {
        this.dialogRef.close();
    }
}
