import {Component} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

const OWl_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26">
  <path
    d="M12,16C12.56,16.84 13.31,17.53 14.2,18L12,20.2L9.8,18C10.69,17.53 11.45,16.84 12,16M17,11.2A2,2 0 0,0 15,13.2A2,2 0 0,0 17,15.2A2,2 0 0,0 19,13.2C19,12.09 18.1,11.2 17,11.2M7,11.2A2,2 0 0,0 5,13.2A2,2 0 0,0 7,15.2A2,2 0 0,0 9,13.2C9,12.09 8.1,11.2 7,11.2M17,8.7A4,4 0 0,1 21,12.7A4,4 0 0,1 17,16.7A4,4 0 0,1 13,12.7A4,4 0 0,1 17,8.7M7,8.7A4,4 0 0,1 11,12.7A4,4 0 0,1 7,16.7A4,4 0 0,1 3,12.7A4,4 0 0,1 7,8.7M2.24,1C4,4.7 2.73,7.46 1.55,10.2C1.19,11 1,11.83 1,12.7A6,6 0 0,0 7,18.7C7.21,18.69 7.42,18.68 7.63,18.65L10.59,21.61L12,23L13.41,21.61L16.37,18.65C16.58,18.68 16.79,18.69 17,18.7A6,6 0 0,0 23,12.7C23,11.83 22.81,11 22.45,10.2C21.27,7.46 20,4.7 21.76,1C19.12,3.06 15.36,4.69 12,4.7C8.64,4.69 4.88,3.06 2.24,1Z"/>
  </svg>
  `;

const START_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
  <path d="M1.75 18.15V5.85h2.275v12.3Zm14.325.05-1.625-1.6 3.45-3.45H5.925v-2.3H17.9L14.475 7.4l1.6-1.6L22.25 12Z"/></svg>
  `;

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('owl', sanitizer.bypassSecurityTrustHtml(OWl_ICON));
    iconRegistry.addSvgIconLiteral('start', sanitizer.bypassSecurityTrustHtml(START_ICON));
  }

}