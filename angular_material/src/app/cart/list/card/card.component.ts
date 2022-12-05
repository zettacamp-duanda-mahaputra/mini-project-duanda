import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CartService } from '../../cart.service';
import { ListComponent } from '../list.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() items: any;

  amount: any
  avail:any
  myForm:any = FormGroup
  
    
   

 

  constructor(private cartService: CartService, private listComponent: ListComponent) { }

  ngOnInit(): void {
    const a = {
      available: this.items?.recipe_id?.available,
    };
    this.avail = a.available;
    this.form()
    this.myForm.patchValue(this.items)

    this.amountChange()
    this.noteChange() 
  }

  form(){
    this.myForm = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(this.avail)]),
      note: new FormControl(null),
    });
  }

  amountChange() {
    if (this.myForm.valid) {
      this.myForm.get('amount')?.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
        if (value) {
          this.OnEdit(this.items._id, value, this.items.note)
        }
      })
    }

  }

  noteChange() {
    this.myForm.get('note')?.valueChanges.pipe(debounceTime(500)).subscribe((data: any) => {
      if (data) {
        this.OnEdit(this.items._id, this.items.amount, data)
      }
    })
  }

  onRemove(item: any) {
    this.cartService.remove(item).subscribe(() => {
      this.listComponent.getAll()
    })

    if(localStorage.getItem('addCart')){
      localStorage.removeItem('addCart')
    }
    

  }

  OnEdit(id: any, amount: any, note: any) {
    this.cartService.edit(id, amount, note).subscribe(() => {
      this.listComponent.getAll()
    })

  }
}
