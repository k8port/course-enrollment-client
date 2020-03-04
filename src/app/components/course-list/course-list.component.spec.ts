import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseService } from '../../services/course.service';
import { EmitterService } from '../../services/emitter.service';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatTableModule, MatPaginatorModule, HttpClientTestingModule, MatSortModule],
      declarations: [CourseListComponent],
      providers: [CourseService, EmitterService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
