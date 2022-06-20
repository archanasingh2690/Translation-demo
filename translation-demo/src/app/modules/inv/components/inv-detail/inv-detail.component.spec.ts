import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvDetailComponent } from './inv-detail.component';

describe('InvDetailComponent', () => {
  let component: InvDetailComponent;
  let fixture: ComponentFixture<InvDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
