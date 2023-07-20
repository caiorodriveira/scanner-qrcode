import { Component } from '@angular/core';

@Component({
  selector: 'app-data-qrcode',
  templateUrl: './data-qrcode.component.html',
  styleUrls: ['./data-qrcode.component.scss']
})
export class DataQrcodeComponent {
  dataQrCode: any;
  constructor(){
    this.dataQrCode = history.state.data;
    console.log('teste')
  }
}
