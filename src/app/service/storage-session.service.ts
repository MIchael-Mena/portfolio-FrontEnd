import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageSessionService {

  private behaviorSubject = new BehaviorSubject<boolean>(this.isLoggedIn);

  constructor() {
  }

  public onToggleSignUp(): Observable<boolean> {
    return this.behaviorSubject.asObservable();
  }

  public saveUser(data: any): void {
    this.behaviorSubject.next(true);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.accessToken);
  }

  public get isLoggedIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  public get token(): string {
    return localStorage.getItem('token') || '';
  }

  public get userValue(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  public cleanUser(): void {
    this.behaviorSubject.next(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
