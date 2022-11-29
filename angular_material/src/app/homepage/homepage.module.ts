import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from "../../environments/environment.prod";
import { initializeApp } from "firebase/app";

initializeApp(environment.firebase);


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Home' },
  { path: 'Menu', component: MenuComponent, title: 'Menu' },
  { path: 'Login', component: LoginComponent, title: 'Login' }
]


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    HttpClientModule,
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule { }
