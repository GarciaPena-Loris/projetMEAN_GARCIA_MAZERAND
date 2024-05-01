import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../model/user.interface";
import {
  MatSnackBar,
} from "@angular/material/snack-bar";
import {SnackBarComponent} from "./snackBar.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.css'
})
export class AuthCardComponent {
  activeTabIndex = 0;
  registerForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    mail: ['', [Validators.required, Validators.email]],
    mdp: ['', [Validators.required, Validators.minLength(6)]],
    telephone: [''],
  });

  loginForm = this.fb.group({
    mailControlLogin: ['', [Validators.required, Validators.email]],
    passwordControlLogin: ['', [Validators.required, Validators.minLength(6)]],
  });

  durationInSeconds = 5;


  constructor(private router: Router, public authService: AuthService, private fb: FormBuilder, private _snackBar: MatSnackBar) {
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value.mailControlLogin!, this.loginForm.value.passwordControlLogin!)
      .subscribe(
        (response) => {
          this.openSnackBar("Connection réussi !");
          this.authService.currentUser = response;
          this.authService.isAuthenticated = true;
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Erreur lors de la connexion:', error);
          this.openSnackBar("Un problème est survenue lors de la connexion !");
        }
      );
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const formValue = this.registerForm.value;

    const user: User = {
      nom: formValue.nom || '',
      prenom: formValue.prenom || '',
      mail: formValue.mail || '',
      mdp: formValue.mdp || '',
      telephone: formValue.telephone || '',
    };

    this.authService.register(user)
      .subscribe(
        (response) => {
          this.openSnackBar("Inscription réussi ! Vous pouvez vous connecter");
          this.activeTabIndex = 0;
        },
        (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          this.openSnackBar("Un problème est survenue lors de l'inscription !");
        }
      );
  }

  openSnackBar(customText: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      data: customText // Transmettez le texte personnalisé ici
    });
  }
}

