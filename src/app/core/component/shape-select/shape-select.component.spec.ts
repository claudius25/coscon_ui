import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeSelectComponent } from './shape-select.component';

describe('ShapeSelectComponent', () => {
  let component: ShapeSelectComponent;
  let fixture: ComponentFixture<ShapeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapeSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShapeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
