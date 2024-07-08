import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotvalidComponent } from './notvalid.component';

describe('NotvalidComponent', () => {
  let component: NotvalidComponent;
  let fixture: ComponentFixture<NotvalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotvalidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotvalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
