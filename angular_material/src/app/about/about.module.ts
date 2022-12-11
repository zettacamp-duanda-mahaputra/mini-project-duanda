import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path:'', component: AboutComponent, title:'About'}
]



@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    HttpClientModule

  ],
  exports: [
    AboutComponent
  ]
})
export class AboutModule { }
