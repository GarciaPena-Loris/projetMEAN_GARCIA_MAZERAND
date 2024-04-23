import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth-card/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  navigateHomePage() {
    this.router.navigate([''])
  }

  login() {
    // Redirection vers la page après la connexion
    this.router.navigate(['/auth']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
