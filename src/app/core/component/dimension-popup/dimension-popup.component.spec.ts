import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensionPopupComponent } from './dimension-popup.component';

describe('DimensionPopupComponent', () => {
  let component: DimensionPopupComponent;
  let fixture: ComponentFixture<DimensionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DimensionPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DimensionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
