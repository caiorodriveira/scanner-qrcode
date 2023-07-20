import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qr-code-scanner';

  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>

  constructor(){

  }

  //após a página ser completamente carregada
  ngAfterViewInit(): void {
    this.prepareScanner();
  }

  async prepareScanner(){
    const available = await this.checkCamera();
    if(available) this.startScanner();
  }

  async startScanner() {
    
  }

  //verifica dse possui permissão do navegador de camêra
  async checkCamera(){
    const cameraPermission = await navigator.permissions.query({name: 'camera'} as any)
    console.log(cameraPermission);
    const isOk = cameraPermission.state !== "denied";

    const hasMediaDevice = 'mediaDevices' in navigator;
    const hasUserMedia = 'getUserMedia' in navigator.mediaDevices

    if(!hasMediaDevice || (!hasUserMedia && isOk)){
      alert("Nao conseguimos acesso a camera, por favor verifique");
    }

    return isOk;
  }
}
