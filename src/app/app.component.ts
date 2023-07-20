import { Component, ElementRef, ViewChild } from '@angular/core';
import { VIDEO_CONFIG } from './scanner.const';
import jsQR from 'jsqr';
import { Subject, takeUntil, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'qr-code-scanner';

  @ViewChild('videoElement') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef;
  videoStream!: MediaStream;

  config = structuredClone(VIDEO_CONFIG)

  private destroy$ = new Subject<void>();
  constructor(private rota: Router, private rotaAtual: ActivatedRoute){

  }

  //após a página ser completamente carregada
  ngAfterViewInit(): void {
    this.prepareScanner();
  }

  //altera frontal ou traseira
  changeCamera(){
    let {facingNode} = this.config.video;
    this.config.video.facingNode = facingNode === 'enviroment' ? 'user': 'enviroment';
    this.startScanner()
  }


  async prepareScanner(){
    const available = await this.checkCamera();
    if(available) this.startScanner();
  }

  //realiza scanner
  async startScanner() {
    this.videoStream = await navigator.mediaDevices.getUserMedia(this.config)
    this.video.nativeElement.srcObject = this.videoStream;

    //verifica a cada toco se conseguiu identificar algum frame
    this.spyCamera();
  }

  spyCamera(){
    if(this.video.nativeElement){
      const {clientHeight, clientWidth} = this.video.nativeElement

      this.canvas.nativeElement.width = clientHeight;
      this.canvas.nativeElement.height = clientHeight;

      const canvas = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D

      canvas.drawImage(this.video.nativeElement, 0, 0, clientWidth, clientHeight);

      const inversionAttempts = 'dontInvert';

      const image = canvas.getImageData(0,0, clientWidth, clientHeight)
      const qrcode = jsQR(image.data, image.width, clientHeight, {inversionAttempts: inversionAttempts})

      if(qrcode) {
        console.log(qrcode);

        const {data} = qrcode;

        this.rota.navigate(['qrcode'], {relativeTo: this.rotaAtual, state: {data}});

      } else {
        timer(500).pipe(takeUntil(this.destroy$)).subscribe({
          next: () => {
            this.spyCamera();
          }
        })
      }
    }
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

  ngOnDestroy() {

    this.videoStream.getTracks().forEach(track => track.stop());
    this.video = null!;

    this.destroy$.next()
    this.destroy$.complete()
  }
}
