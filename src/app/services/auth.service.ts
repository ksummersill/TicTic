import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, throttle } from 'rxjs/operators';

// Ionic Native
import { Platform } from 'ionic-angular';

// Social Login
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

// Model/ Interface
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null); // The behavior-roles of the user.
  authState: any = null; // The object of the user observed.

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private fb: Facebook,
              private googlePlus: GooglePlus,
              private platform: Platform,
              private router: Router) {

              afs.firestore.settings({ timestampsInSnapshots: true });

              this.afAuth.authState
              .pipe(switchMap(user => {
                if (user) {
                  console.log(user);
                  return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                  console.log('nothing');
                  return of(null);
                }
              })
            )
            .subscribe((userData) => {
              console.log(userData);
              this.user$.next(userData);
              });
    }

// Returns true if user is logged in
        get authenticated(): boolean {
          return this.authState !== null;
          }

          // Returns current user data
          get currentUser(): any {
              return this.authenticated ? this.authState : null;
          }

          // Returns
          get currentUserObservable(): any {
          return this.afAuth.authState;
          }

          // Returns current user UID
          get currentUserId(): string {
          return this.authenticated ? this.authState.uid : '';
          }

          // Anonymous User
          get currentUserAnonymous(): boolean {
          return this.authenticated ? this.authState.isAnonymous : false;
          }

          get currentUserName(): string {
              // tslint:disable-next-line:max-line-length
              if (this.currentUserAnonymous) {return 'Friend';
              }  else if (this.authenticated) { return this.authState['email'];
              } else { return 'No User'; }
          }

    // googleLogin() {
    //   const provider = new firebase.auth.GoogleAuthProvider();
    //   provider.addScope('profile');
    //   provider.addScope('email');
    //   return this.oAuthLogin(provider);
    // }

    // facebookLogin() {
    //   const provider = new firebase.auth.FacebookAuthProvider();
    //   provider.addScope('profile');
    //   provider.addScope('email');
    //   return this.oAuthLogin(provider);
    // }

    private oAuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
        .then((credential) => {
          this.authState = credential.user;
          this.updateUserData(credential.user);
          this.router.navigateByUrl('/gselection');
        });
    }

    private updateUserData(user) {
      console.log(user);
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
      return userRef.set(data, { merge: true });
    }

        // Sign out
    signOut(): void {
        this.afAuth.auth.signOut()
        .then((user) => {
        this.authState = user;
        });
        this.router.navigate(['/login']);
      }

    // Email/Password Auth
    emailSignUp(email: string, password: string) {
      console.log(email);
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user.user);
          this.authState = user.user;
          this.updateUserData(user.user);
          this.router.navigateByUrl('/gselection');
        })
        .catch(error => {
            console.log(error);
            throw error;
    });
  }

  // Email Login Auth
  emailLogin(email: string, password: string) {
    console.log(email);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
        this.updateUserData(user.user);
        this.authState = user.user;
        this.router.navigateByUrl('/gselection');
    })
    .catch(error => console.log(error)
  );
  }

  facebookLogin(): Promise<any> {
    return this.fb.login(['email']);
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      const gplusUser = await this.googlePlus.login({
        'webClientId': 'tictic-afd80.firebaseapp.com',
        'offline': true,
        'scopes': 'profile email'
      });
     return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken));

    } catch (err) {
      console.log(err);
    }
  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      return this.oAuthLogin(provider);
    } catch (err) {
      console.log (err);
    }
  }
  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }
  }

}
