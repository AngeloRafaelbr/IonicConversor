import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultipleConversionPage } from './multiple-conversion.page';

describe('MultipleConversionPage', () => {
  let component: MultipleConversionPage;
  let fixture: ComponentFixture<MultipleConversionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleConversionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
