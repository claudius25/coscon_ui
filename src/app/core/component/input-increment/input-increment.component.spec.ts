import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIncrementComponent } from './input-increment.component';

describe('InputIncrementComponent', () => {
  let component: InputIncrementComponent;
  let fixture: ComponentFixture<InputIncrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputIncrementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputIncrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
