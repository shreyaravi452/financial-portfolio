import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCapChartComponent } from './market-cap-chart.component';

describe('MarketCapChartComponent', () => {
  let component: MarketCapChartComponent;
  let fixture: ComponentFixture<MarketCapChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketCapChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketCapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
