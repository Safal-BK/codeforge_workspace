import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResultPopupComponent } from './show-result-popup.component';

describe('ShowResultPopupComponent', () => {
  let component: ShowResultPopupComponent;
  let fixture: ComponentFixture<ShowResultPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowResultPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowResultPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
