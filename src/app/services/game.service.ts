import { Injectable } from '@angular/core';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

// Interface / Models
import { User } from '../models/user';

// Services
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  singlePlayer: boolean;
  gamerName: string;
  scoreX = 0;
  scoreO = 0;
  gamerType: string;
  overallGameScore: number;
  primaryType: string;

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  // addScore(score) {
  //   console.log();
  //     const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  //     const data: User = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName,
  //       photoURL: user.photoURL,
  //       overallScore: user.overallScore
  //     };
  //     return userRef.set(data, { merge: true });
  // }
}
