import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from "../components/about/about/about.component";
import {LoginFormComponent} from "../components/login-form/login-form.component";
import {HomeComponent} from "../components/home/home.component";
import {PageNotFoundComponent} from "../components/page-not-found/page-not-found.component";
import {PermissionGuard} from "../guards/permission-guard.service";
import {UnsavedChangesGuard} from "../guards/unsaved-changes.guard";
import {SkillsComponent} from "../components/skill/skills/skills.component";
import {ProjectsComponent} from "../components/projects/projects/projects.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent, canDeactivate: [UnsavedChangesGuard]},
  {path: 'skills', component: SkillsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'login', component: LoginFormComponent, canActivate: [PermissionGuard]},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    enableTracing: false,
    /*    scrollPositionRestoration: 'enabled',
        scrollOffset: [0, 64]*/
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
