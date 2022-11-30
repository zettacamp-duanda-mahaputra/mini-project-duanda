import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'

const subRoutes:Routes = [
  { path:'', pathMatch:'full', redirectTo:'/Register/RegisterUser'},
  { path: 'RegisterAdmin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'RegisterUser', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
]

const routes: Routes = [
  {path:'', component: RegisterComponent, title:'Register', children: subRoutes}
]



@NgModule({
  declarations: [
    RegisterComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RegisterComponent,
    AdminComponent,
    UserComponent
  ]
})
export class RegisterModule { }
