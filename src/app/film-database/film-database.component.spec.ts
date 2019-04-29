import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDatabaseComponent } from './film-database.component';

describe('FilmDatabaseComponent', () => {
  let component: FilmDatabaseComponent;
  let fixture: ComponentFixture<FilmDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
