import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment.prod';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // I love angular routing in ionic.


// Angular Materials
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatTableModule,
        MatSnackBarModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableDataSource,
        MatMenuModule,
        MatIconRegistry,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatTabsModule,
        MatSidenavModule,
        MatBadgeModule,
        MatSnackBar,
        MatStepperModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatRadioModule,
        MatExpansionModule
      } from '@angular/material';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            BrowserAnimationsModule,
            MatToolbarModule,
            MatFormFieldModule,
            AngularFireAuthModule,
            AngularFirestoreModule,
            AngularFireModule.initializeApp(environment.firebase, 'tictic'),
            ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
