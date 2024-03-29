import {NgModule} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MomentDateModule} from "@angular/material-moment-adapter";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from "@angular/material/menu";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";

const myMaterialModules = [
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MomentDateModule,
  BrowserAnimationsModule,
  MatCheckboxModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSliderModule,
  MatSelectModule,
  MatRippleModule,
  MatDividerModule
];

@NgModule(
  {
    imports: [
      myMaterialModules
    ],
    exports: [
      myMaterialModules
    ],
  }
)

export class MaterialModule {
}
