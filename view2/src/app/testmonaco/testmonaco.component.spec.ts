import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmonacoComponent } from './testmonaco.component';

describe('TestmonacoComponent', () => {
  let component: TestmonacoComponent;
  let fixture: ComponentFixture<TestmonacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestmonacoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestmonacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
