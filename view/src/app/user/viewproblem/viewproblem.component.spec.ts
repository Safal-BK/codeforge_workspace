import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproblemComponent } from './viewproblem.component';

describe('ViewproblemComponent', () => {
  let component: ViewproblemComponent;
  let fixture: ComponentFixture<ViewproblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewproblemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewproblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
