import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Ionic Native
 // import { GooglePlus } from '@ionic-native/google-plus';

// Angualr Services
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment.prod';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';

// Ionic Module
import { IonicModule } from '@ionic/angular';

// Pages
import { LoginPage } from './login.page';

// Angular Material
import { MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase, 'tictic')
  ],
  declarations: [LoginPage],
  providers: [],
})
export class LoginPageModule {}
