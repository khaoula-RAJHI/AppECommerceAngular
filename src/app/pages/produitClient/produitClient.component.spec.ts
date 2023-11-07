import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitClientComponent } from './produitClient.component';

describe('ProduitComponent', () => {
  let component: ProduitClientComponent;
  let fixture: ComponentFixture<ProduitClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
