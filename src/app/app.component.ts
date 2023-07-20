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


}
