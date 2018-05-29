import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {

  }

  goBack() {
    this.router.navigateByUrl('/login');
  }

}
