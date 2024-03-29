import {Component, Input, OnInit} from '@angular/core';
import {ExperienceService} from 'src/app/components/experience/service/experience.service';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {ExperienceData} from 'src/app/components/experience/ExperienceData';

import {UiEditFormService} from 'src/app/components/experience/service/uiEditForm.service';
import {IExperience} from '../IExperience';
import {FormExperience} from '../FormExperience';
import {StorageSessionService} from "../../../service/storage-session.service";
import {LoaderComponentService} from "../../../service/loader-component.service";

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
  // Cada instancia de este componente tendrá su propio servicio y los componentes hijos
  // tendrán acceso a este servicio
  providers: [UiEditFormService, ExperienceService]
})
export class ExperiencesComponent implements OnInit {
  faSquarePlus = faSquarePlus;
  public isLoading: boolean = false;
  public isLoggedIn: boolean = false;
  public experiences: ExperienceData[] = [];
  public formExperienceConfig: { showForm: boolean, experienceIsNew: boolean } = {
    showForm: false,
    experienceIsNew: true,
  };
  public formExperience!: FormExperience;
  @Input() experience!: IExperience;

  constructor(private uiEditFormService: UiEditFormService,
              private storageService: StorageSessionService,
              private experienceService: ExperienceService,
              private loaderService: LoaderComponentService) {
    this.storageService.onToggleSignUp().subscribe((result: boolean) => {
      this.isLoggedIn = result;
    });
  }

  ngOnInit(): void {
    this.loaderService.toggleLoad(true, this.experience.title);
    this.experience.serviceToUse(this.experienceService);
    this.experience.onToggleAdd().subscribe((result: boolean) => {
      // El formulario se muestra cuando se pulsa el botón de añadir experiencia
      // que está en el componente padre
      this.showForm();
    });
    this.formExperience = this.experience.formToUse();
    this.isLoading = true;
    this.experienceService.expOrderByInitialDate.subscribe(experiences => {
        this.isLoading = false;
        this.experiences = experiences.map((experience) => {
          return this.formExperience.parseToExperienceData(experience);
        });
        this.loaderService.toggleLoad(false, this.experience.title);
      }
    );
  }

  public showForm(): void {
    this.formExperienceConfig = {...this.formExperienceConfig, showForm: !this.formExperienceConfig.showForm};
  }

  public addExperience(experience: ExperienceData): void {
    this.experiences.push(experience);
  }

  public updateExperience(experience: ExperienceData): void {
    this.experiences = this.experiences.map((t: ExperienceData) => {
      if (t.id === experience.id) {
        return experience;
      }
      return t;
    });
  }

  public deleteExperience(experience: ExperienceData): void {
    this.experiences = this.experiences.filter((t: ExperienceData) => t.id !== experience.id);
  }

  public editExperience(experience: ExperienceData, element: HTMLElement): void {
    // Envío el objeto experience al servicio, y es recibido por add-experience
    // que está subscrito al servicio. Para que lo pueda mostrar en el formulario

    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    // TODO: EL scroll no sube de forma suave cuando el formulario está oculto, pero si cuando está visible
    // por lo que se hace un pequeño retraso para que el scroll se haga cuando el formulario está visible
    setTimeout(() => {
      this.formExperienceConfig = {showForm: true, experienceIsNew: false};
      this.uiEditFormService.toggleEdit(experience);
    }, 1000);

    /*    const routerOption: ExtraOptions = {
          scrollPositionRestoration: 'enabled',
          anchorScrolling: 'enabled',
          onSameUrlNavigation: 'reload',
        }

        this.router.navigate([], {fragment: element.id, ...routerOption});*/

    // window.scrollTo(0, 0);
  }

}
