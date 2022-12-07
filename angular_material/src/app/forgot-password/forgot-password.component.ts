import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
      console.log(this.myForm.value.email);
    })
  }

}
