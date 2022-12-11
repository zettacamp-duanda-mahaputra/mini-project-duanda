import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    theIngredients: any;
    myForm: any = FormGroup;
    avail: any;
    isLogin: any

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
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        if (this.data) {
            this.carts = this.data;
            this.ingredients.push(this.carts.ingredients);

            for (let ingredient of this.ingredients)
                for (let ingre of ingredient) {
                    this.finalIngredients.push(ingre.ingredient_id.name);
                    this.theIngredients = this.finalIngredients.join(', ');
                }
        }
        const a = {
            available: this.carts.available,
        };
        this.avail = a.available;

        this.form();

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
                }
                else if (result.isDenied) {
                    Swal.fire({
                        icon: 'info',
                        text: 'Please register to complete your transaction'
                    })
                    this.router.navigate(['/Register/RegisterUser']).then(() => {
                        localStorage.setItem('addCart', JSON.stringify(val))
                    })

                }
            })
        }
        else {
            if (this.myForm.valid) {
                const value: any = {
                    addToCartId: this.data._id,
                    ...this.myForm.value,
                };

                this.cartService.add(value).subscribe(() => {
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

                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: 'amount not available'
                });
            }
        }


    }


    onCancel() {
        this.dialogRef.close();
    }
}
