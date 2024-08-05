import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsActionsComponent } from './insights-actions.component';

describe('InsightsActionsComponent', () => {
  let component: InsightsActionsComponent;
  let fixture: ComponentFixture<InsightsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightsActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
