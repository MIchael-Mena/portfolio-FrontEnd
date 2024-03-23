import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { CardProjectComponent } from './card-project/card-project.component';
import { SharedModule } from '../../core/shared.module';
import { MenuEditionModule } from '../../shared/components/menu-edition/menu-edition.module';
import { MainHeaderModule } from '../../shared/components/main-header/main-header.module';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ModalProjectComponent } from './modal-project/modal-project.component';
import { ButtonModalModule } from '../../shared/components/button-modal/button-modal.module';
import { AddButtonModule } from '../../shared/components/add-button/add-button.module';
import { MatChipsModule } from '@angular/material/chips';
import { CarouselComponent } from './carousel/carousel.component';
import { ChipsComponent } from './chips/chips.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    ProjectsComponent,
    CardProjectComponent,
    ModalProjectComponent,
    CarouselComponent,
    ChipsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MenuEditionModule,
    MainHeaderModule,
    GalleryModule,
    LightboxModule,
    ButtonModalModule,
    AddButtonModule,
    CarouselModule,
    MatChipsModule,
    MatAutocompleteModule,
    NgOptimizedImage,
  ],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}