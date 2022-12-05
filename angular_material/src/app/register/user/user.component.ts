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
          text: 'Login Success'
        })
        this.router.navigate(['Login']).then(() => {
          window.location.reload();
        });
      }, err=>{
        Swal.fire('Failed', 'Not Completed', 'error');
      })
    }else{
      Swal.fire('Failed', 'Not Completed', 'error');
    }
    
   
  }

}
