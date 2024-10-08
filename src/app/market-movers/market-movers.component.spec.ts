import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketMoversComponent } from './market-movers.component';

describe('MarketMoversComponent', () => {
  let component: MarketMoversComponent;
  let fixture: ComponentFixture<MarketMoversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketMoversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketMoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
