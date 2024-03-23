import { Component } from '@angular/core';

import { StorageSessionService } from '../../services/storage-session.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  faUserSecret,
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public routeAboutActive: boolean = false;
  public routeSkillsActive: boolean = false;
  public routeProjectsActive: boolean = false;
  public routeLoginActive: boolean = false;
  public icon = {
    faUserSecret,
    faArrowRightFromBracket,
    faArrowRightToBracket,
  };
  public navItems = [
    {
      title: 'Acerca de mí',
      route: 'about',
      isActive: this.routeAboutActive,
    },
    {
      title: 'Habilidades',
      route: 'skills',
      isActive: this.routeSkillsActive,
    },
    {
      title: 'Proyectos',
      route: 'projects',
      isActive: this.routeProjectsActive,
    },
  ];

  public isLoggedIn: boolean = false;

  constructor(
    public storageService: StorageSessionService,
    private authService: AuthService,
    private router: Router
  ) {
    this.storageService.onToggleSignUp().subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
  }

  public routerActive(state: boolean, route: string): void {
    // this.routeLoginActive = state;
    switch (route) {
      case 'about':
        this.routeAboutActive = state;
        break;
      case 'skills':
        this.routeSkillsActive = state;
        break;
      case 'projects':
        this.routeProjectsActive = state;
        break;
      case 'login':
        this.routeLoginActive = state;
        break;
    }
  }

  public logOut(): void {
    this.authService.logout().subscribe({
      next: (data: any) => {
        this.storageService.cleanUser();
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  prueba() {
    console.log('prueba');
  }
}