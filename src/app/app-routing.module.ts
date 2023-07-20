import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataQrcodeComponent } from './data-qrcode/data-qrcode.component';
import { AppComponent } from './app.component';
import { ScannerComponent } from './scanner/scanner.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: 'home', pathMatch: 'full', component: ScannerComponent
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
