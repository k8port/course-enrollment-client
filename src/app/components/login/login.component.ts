import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private emitterService: EmitterService) {
  }

  ngOnInit() {
  }

  logIn() {
    this.authService.logIn(this.user)
      .subscribe(data => {
        this.emitterService.emitLogin(JSON.stringify(data));
        this.router.navigate(['/profile']).then(() => {});
      }, () => {
        this.errorMessage = 'username or password incorrect';
      });
  }

}
