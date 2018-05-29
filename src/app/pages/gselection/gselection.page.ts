import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-gselection',
  templateUrl: './gselection.page.html',
  styleUrls: ['./gselection.page.scss'],
})
export class GselectionPage implements OnInit {

  xoselection: string;

  constructor(public router: Router, private gService: GameService, public auth: AuthService) { }

  ngOnInit() {
  }

  singlePlayer() {
    this.router.navigateByUrl('/game');
      this.gService.singlePlayer = true;
      this.gService.gamerType = this.xoselection;
  }

  twoPlayers() {
    this.router.navigateByUrl('/game');
      this.gService.singlePlayer = false;
  }
}
