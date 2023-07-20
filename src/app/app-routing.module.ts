import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataQrcodeComponent } from './data-qrcode/data-qrcode.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'home', pathMatch: 'full', component: AppComponent
  },
  {
    path: 'qrcode', pathMatch: 'full', component: DataQrcodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
