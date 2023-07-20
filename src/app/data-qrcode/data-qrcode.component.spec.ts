import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataQrcodeComponent } from './data-qrcode.component';

describe('DataQrcodeComponent', () => {
  let component: DataQrcodeComponent;
  let fixture: ComponentFixture<DataQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataQrcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
