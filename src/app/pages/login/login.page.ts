import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AngularFire
import { AngularFireAuth } from 'angularfire2/auth';

// Ionic Native
import { GooglePlus } from '@ionic-native/google-plus';

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Login Form 1
  loginForm: FormGroup;

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              public auth: AuthService,
              private fb: FormBuilder,
              // private gplus: GooglePlus
            ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  signUp() {
    this.router.navigateByUrl('/signup');
  }

  // Return LoginForm Response
  get email() {
    return this.loginForm.get('email');
  }

  get firstName() {
    return this.loginForm.get('password');
  }
}
