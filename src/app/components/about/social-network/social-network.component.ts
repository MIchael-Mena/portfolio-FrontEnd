import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSquareCaretDown, faPenToSquare, faGrip} from '@fortawesome/free-solid-svg-icons';
import {faTrashCan, faSquarePlus} from '@fortawesome/free-regular-svg-icons';
import {StorageSessionService} from "../../../service/storage-session.service";
import {MatDialog} from "@angular/material/dialog";
import {SocialNetwork} from "./SocialNetwork";
import {ModalResponse} from "../../shared/ModalResponse";
import {ModalSocialNetworkComponent} from "../modal-social-network/modal-social-network.component";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {ActionForShipment} from "../../shared/ActionForShipment";
import {ComponentState} from "../../shared/ComponentState";
import {DialogContent} from "../../dialog-card/DialogContent";
import {DialogCardComponent} from "../../dialog-card/dialog-card.component";
import {Observable} from "rxjs";
import {SocialNetworkService} from "../service/social-network.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.css'],
})
export class SocialNetworkComponent implements OnInit {

  @Input() isVisible: boolean = false;
  @Output() isLoading: EventEmitter<ComponentState> = new EventEmitter();
  public socialNetworks: SocialNetwork[] = [];
  public icons = {faSquareCaretDown, faPenToSquare, faTrashCan, faSquarePlus, faGrip}
  public isLoggedIn: boolean = false;
  public activeEdit: boolean = false;
  public activeDragAndDrop: boolean = false;
  private positions: number[] = [];
  private reorderPositions = (id: number, newPosition: number, oldPosition: number) => {
    this.reorderPositionsOfSocialNetworks(id, newPosition, oldPosition);
  }

  constructor(private storageService: StorageSessionService, private dialog: MatDialog,
              private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,
              private socialService: SocialNetworkService) {
    this.storageService.onToggleSignUp().subscribe(() => {
      this.isLoggedIn = storageService.isLoggedIn;
    });
  }


  ngOnInit(): void {
    // OnInit se ejecuta despu??s de OnChanges
    this.isLoading.emit({name: 'social-network', isLoading: true});
    this.socialService.socialNetworksOrder.subscribe((socialNetworks: SocialNetwork[]) => {
      this.socialNetworks = socialNetworks;
      this.socialNetworks.forEach(social => {
        this.registerIconSvg((social.id!).toString(), social.icon);
      })
      this.positions = this.socialNetworks.map(social => social.position);
      this.isLoading.emit({name: 'social-network', isLoading: false});
    });
  }

  public activateDragAndDrop(): void {
    this.activeDragAndDrop = !this.activeDragAndDrop;
  }

  public drop(event: CdkDragDrop<SocialNetwork[]>): void {
    // console.log(event);
    //TODO: en media query menor a 600px no funciona el drag and drop, se divide la fila en dos
    moveItemInArray(this.socialNetworks, event.previousIndex, event.currentIndex);
    this.updatePositionInSocialNetworks();
  }

  private updatePositionInSocialNetworks(): void {
    this.socialNetworks.forEach((social, index) => {
      if (social.position !== index + 1) {
        social.position = index + 1;
        this.updatePositionSocialNetwork(social);
      }
    });
  }

  private registerIconSvg(id: string, icon: string): void {
    this.iconRegistry.addSvgIconLiteral(id, this.domSanitizer.bypassSecurityTrustHtml(icon));
  }

  public editSocialNetwork(): void {
    this.activeEdit = !this.activeEdit;
  }

  private reorderPositionsOfSocialNetworks(id: number, newPosition: number, oldPosition: number): void {
    // Lo puede hacer el backend, pero lo hago aqu?? para que se vea el cambio en tiempo real
    // Tengo que asignarle la nueva posici??n a las redes sociales, menos a la que se est?? moviendo
    // el elemento que se inserta desplaza a los dem??s elementos
    this.socialNetworks.forEach(social => {
      if (social.position > oldPosition && social.position <= newPosition) {
        social.position--;
        this.updatePositionSocialNetwork(social);
      } else if (social.position < oldPosition && social.position >= newPosition) {
        social.position++;
        this.updatePositionSocialNetwork(social);
      }
    });
  }

  private updatePositionSocialNetwork(social: SocialNetwork): void {
    // Mejorar esto, en el backend se puede hacer un update de una sola red social
    this.socialService.updatePosition(social.id!, social.position, this.storageService.token).subscribe({
      next: (social: SocialNetwork) => {
        // console.log(social);
      },
      error: error => {
        console.log(error);
      }
    });

  }

  public openDeleteDialog(target: SocialNetwork): void {
    if (this.activeDragAndDrop) return;
    const data = <DialogContent>{
      title: 'Eliminar red social ' + this.socialNetworks[0].name,
      message: '??Est??s seguro de que quieres eliminar esta red social?',
      buttonConfirm: 'Eliminar',
      buttonCancel: 'Cancelar',
      buttonConfirmLoading: 'Eliminando...',
      payload: () => this.socialService.delete(target, this.storageService.token)
    }
    const dialogRef = this.dialog.open(DialogCardComponent, {
      data,
      width: '350px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.socialNetworks = this.socialNetworks.filter(social => social.id !== target.id);
      } else if (result.error) {
        console.log(result.error);
        alert('Error al eliminar la red social');
      }
    });
  }

  private updateSocialNetwork(social: SocialNetwork): Observable<SocialNetwork> {
    return this.socialService.update(social, this.storageService.token)
  }

  public openEditModal(socialNetwork: SocialNetwork): void {
    if (this.activeDragAndDrop) return;
    const data = <ActionForShipment>{
      action: 'Editar',
      onAction: (social: SocialNetwork) => this.updateSocialNetwork(social),
      setDataToForm: (callback: (social: SocialNetwork) => void) => callback(socialNetwork),
      reorderPositions: this.reorderPositions,
      positions: this.positions
    }
    const dialogRef = this.dialog.open(ModalSocialNetworkComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      width: '450px',
      height: '600px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.registerIconSvg((result.content.id).toString(), result.content.icon);
        const index = this.socialNetworks.findIndex(social => social.id === socialNetwork.id);
        this.socialNetworks[index] = result.content as SocialNetwork;
        this.socialNetworks.sort((a, b) => a.position - b.position);
      }
    });
  }

  public openAddModal(): void {
    // id = 0 porque no se ha creado a??n
    this.positions.push(this.positions.length + 1);
    const data = <ActionForShipment>{
      action: 'Agregar',
      onAction: (social: SocialNetwork) => this.socialService.add(social, this.storageService.token),
      setDataToForm: (callback: (social: SocialNetwork) => void) => {
      },
      reorderPositions: this.reorderPositions,
      positions: this.positions
    }
    const dialogRef = this.dialog.open(ModalSocialNetworkComponent, {
      data,
      disableClose: true,
      autoFocus: true,
      width: '450px',
      height: '600px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
    dialogRef.afterClosed().subscribe((result: ModalResponse) => {
      if (result.state) {
        this.registerIconSvg((result.content.id).toString(), result.content.icon);
        this.socialNetworks.push(result.content as SocialNetwork);
      } else {
        this.positions.pop();
      }
    });
  }


}
