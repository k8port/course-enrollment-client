import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../model/course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Transaction } from '../../model/transaction';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['detail', 'title', 'author', 'category', 'action'];
  dataSource: MatTableDataSource<string> = new MatTableDataSource<string>(this.displayedColumns);
  errorMessage: string;
  infoMessage: string;

  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private emitterService: EmitterService) {
    this.emitterService.onSearch.subscribe({
      next: (event: any) => {
        this.search(event.id, event.text);
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id;
      let text;
      if (params.has('id')) {
        id = params.get('id');
      }
      if (params.has('text')) {
        text = params.get('text');
      }
      this.search(id, text);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  search(id, text) {
    if (id === '1') {
      this.findAllCourses();
    } else if (id === '2') {
      this.popularCourses();
    } else if (id === '3') {
      this.filterCourses(text);
    }
  }

  findAllCourses() {
    this.courseService.findAllCourses().subscribe(data => this.dataSource.data = data);
  }

  popularCourses() {
    this.courseService.popularCourses().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  filterCourses(text: string) {
    this.courseService.filterCourses(text).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  enroll(course: Course) {
    const transaction = new Transaction();
    transaction.course = course;
    this.courseService.enroll(transaction).subscribe(() => {
      this.infoMessage = 'Enrollment successful: ' + course.title;
    }, () => {
      this.errorMessage = 'Unexpected Error';
    });
  }

  detail(course: Course) {
    localStorage.setItem('currentCourse', JSON.stringify(course));
    this.router.navigate([`/course/${course.id}`]).then(() => {
    });
  }
}
