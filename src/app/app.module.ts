import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MomentDateModule } from '@angular/material-moment-adapter';

// Necesario para usar la fecha en español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Necesario para usar [formControl] en los inputs
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavComponent } from './components/nav/nav.component';
import { ExperienceAndEducationComponent } from './components/experience-and-education/experience-and-education.component';
import { CardComponent } from './components/card/card.component';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { UpdateDirective } from './directives/update.directive';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

registerLocaleData(localeEs, 'es');

/* const appRoutes: Routes = [
  { path: '', component: Home },
] */

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ExperienceAndEducationComponent,
    CardComponent,
    AddExperienceComponent,
    UpdateDirective,
    DatePickerComponent
  ],
  imports: [
    BrowserModule, 
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MomentDateModule,
    BrowserAnimationsModule
  ],
  providers: [ {provide: LOCALE_ID, useValue: 'es'} ],
  bootstrap: [AppComponent]
})
export class AppModule { }