import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  hide = true;
  myForm = new FormGroup({
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private registerService: RegisterService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const value = this.myForm.value;
    
    if(this.myForm.valid){
      this.registerService.create(value).subscribe(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Register Success'
        })
        this.router.navigate(['Login'])
      }, err=>{
        Swal.fire('Failed', err.message, 'error');
      })
    }else{
      Swal.fire('Failed', 'Not Completed', 'error');
    }
    
   
  }

}
