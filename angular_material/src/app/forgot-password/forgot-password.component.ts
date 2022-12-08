import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  myForm = new FormGroup({
    email: new FormControl(null)
  })

  constructor(private router:Router, private forgotService:ForgotPasswordService) { }

  ngOnInit(): void {
  }

  onBack(){
    this.router.navigate(['Login'])
  }

  onSubmit(){
    this.forgotService.forgot(this.myForm.value.email).subscribe(()=>{
      Swal.fire({
        icon:'success',
        text:'Check your email'
      })
      this.myForm.reset()
    }, err=>{
      Swal.fire({
        icon:'error',
        text: err.message
      })
    })
  }

}
