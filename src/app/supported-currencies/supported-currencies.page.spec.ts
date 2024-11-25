import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportedCurrenciesPage } from './supported-currencies.page';

describe('SupportedCurrenciesPage', () => {
  let component: SupportedCurrenciesPage;
  let fixture: ComponentFixture<SupportedCurrenciesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportedCurrenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
