import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  href:string
  token:any

  myForm = new FormGroup({
    password: new FormControl(null)
  })

  hide = true;

  constructor(private resetService:ResetPasswordService, private router:Router) { }

  ngOnInit(): void {
    this.href = this.router.url;    
    this.token = this.href.slice(15,this.href.length) 
       
    this.resetService.get(this.token).subscribe(()=>{})
  }

  onBack(){
    this.router.navigate(['ForgotPassword'])
  }

  onSubmit(){
    this.resetService.update(this.token,this.myForm.value.password).subscribe(()=>{
      Swal.fire({
        icon:'success',
        text:'Password has been updated'
      }).then(()=>{
        this.router.navigate(['Login'])
      })
    })
  }

}
