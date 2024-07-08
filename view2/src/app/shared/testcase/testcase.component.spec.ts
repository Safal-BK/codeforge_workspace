import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseComponent } from './testcase.component';

describe('TestcaseComponent', () => {
  let component: TestcaseComponent;
  let fixture: ComponentFixture<TestcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestcaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
