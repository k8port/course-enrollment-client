import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from '../../services/log.service';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../model/course';
import { Log } from '../../model/log';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ip } from '../../model/ip';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {
  courseId: string;
  currentCourse: Course;
  currentLog: Log;
  courseHitCount: any;
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<string> = new MatTableDataSource<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private logService: LogService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute) {
    this.currentCourse = JSON.parse(localStorage.getItem('currentCourse'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.courseId = params.get('id');
        this.currentLog.courseId = this.courseId;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  createLog() {
    this.logService.getIpClient().subscribe((data: Ip) => {
      this.currentLog.ip = data.ip;
      this.hit(data.ip);
    });
  }

  hit(ip) {
    this.logService.createLog(this.currentLog).subscribe(() => {
      console.log('hit: ' + ip);
    });
  }

  showSummary() {
    this.logService.getSummaryOfCourse(this.courseId).subscribe(data => {
      if (data) {
        this.courseHitCount = data.hitCount;
      } else {
        this.courseHitCount = 0;
      }
    });
  }

  findStudents() {
    this.courseService.filterStudents(this.courseId).subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
