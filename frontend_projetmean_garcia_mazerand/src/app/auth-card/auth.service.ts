import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.interface";
import {catchError, Observable, tap} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3080/api';
  private _isAuthenticated = false;
  private _currentUser: User | undefined;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    // Vérifier s'il existe un cookie d'authentification valide au démarrage de l'application
    const isAuthenticated = this.cookieService.check('authToken');
    if (isAuthenticated) {
      // Récupérer les informations de l'utilisateur à partir du cookie
      this._currentUser = JSON.parse(this.cookieService.get('authToken'));
      this._isAuthenticated = true;
    }
  }

  login(email: string, password: string): Observable<User> {
    const body = {"mail": email, "mdp": password};
    return this.http.post<User>(this.apiUrl + '/login', body).pipe(
      tap(user => {
        // Stocker les informations de l'utilisateur dans un cookie lors de la connexion réussie
        this.cookieService.set('authToken', JSON.stringify(user));
        this._currentUser = user;
        this._isAuthenticated = true;
      }),
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }

  register(user: User): Observable<User> {
    const body = {"utilisateur": user};
    return this.http.post<User>(this.apiUrl + '/register', body).pipe(
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }

  logout() {
    this._isAuthenticated = false;
    this._currentUser = undefined;
  }

  set currentUser(user: User) {
    this._currentUser = user;
  }

  set isAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get isAuthenticatedUser(): boolean {
    return this._isAuthenticated;
  }

  get currentUserInfo(): any {
    return this._currentUser;
  }
}
