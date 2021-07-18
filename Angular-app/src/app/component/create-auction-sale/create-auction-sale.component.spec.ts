import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuctionSaleComponent } from './create-auction-sale.component';

describe('CreateAuctionSaleComponent', () => {
  let component: CreateAuctionSaleComponent;
  let fixture: ComponentFixture<CreateAuctionSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAuctionSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAuctionSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
