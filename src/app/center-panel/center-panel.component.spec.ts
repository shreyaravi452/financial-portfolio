import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterPanelComponent } from './center-panel.component';

describe('CenterPanelComponent', () => {
  let component: CenterPanelComponent;
  let fixture: ComponentFixture<CenterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
