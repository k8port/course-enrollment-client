import { Component } from '@angular/core';
import { EmitterService } from './services/emitter.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'course-enrollment-client';
  searchText: string;
  currentUser: User;

  constructor(private emitterService: EmitterService, private router: Router, private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.emitterService.onLogin.subscribe({
      next: (event: any) => {
        this.currentUser = JSON.parse(event.message);
      }
    });
  }

  logOut() {
    this.authService.logOut().subscribe(() => {
      this.router.navigate(['/login']).then(() => {
      });
    });
  }

  searchAll() {
    if (this.router.url === '/course-list') {
      this.emitterService.emitSearch(1, this.searchText);
      return;
    }
    this.router.navigate(['/course-list', { id: 1 }]).then(() => {
    });
  }

  searchPopular() {
    if (this.router.url === '/course-list') {
      this.emitterService.emitSearch(2, this.searchText);
      return;
    }
    this.router.navigate(['/course-list', { id: 2 }]).then(() => {
    });
  }

  searchFilter() {
    if (this.router.url === '/course-list') {
      this.emitterService.emitSearch(3, this.searchText);
      return;
    }
    this.router.navigate(['/course-list', { id: 3 }]).then(() => {
    });
  }
}
