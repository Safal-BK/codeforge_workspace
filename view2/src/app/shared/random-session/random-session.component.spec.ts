import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomSessionComponent } from './random-session.component';

describe('RandomSessionComponent', () => {
  let component: RandomSessionComponent;
  let fixture: ComponentFixture<RandomSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
