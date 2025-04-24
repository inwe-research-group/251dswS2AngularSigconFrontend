import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPersonaResponse } from '../../model/persona-response';
import { PersonaService } from '../../service/persona.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IPersonaRequest } from '../../model/persona-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  personaArray: IPersonaResponse[] = [];
  personaRequest: IPersonaRequest = {} as IPersonaRequest;
  personaForm: FormGroup;
  page: number = 1;
  isEdited: boolean = false;
  constructor(private personaService: PersonaService) {
    this.personaForm = new FormGroup({
      idPersona: new FormControl(''),
      apellidoPaterno: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      apellidoMaterno: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      idTipoDocumento: new FormControl('1', [Validators.required]),
      ndocumento: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      idUbigeo: new FormControl('150101', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.isEdited = false;
    this.personaForm.reset();
    this.getPersonas();
    this.personaForm.controls['idTipoDocumento'].setValue(1);
    this.personaForm.controls['idUbigeo'].setValue('150101');
  }
  getPersonas(): void {
    this.personaService.getPersonas().subscribe((result: any) => {
      //console.log('Result', result);
      this.personaArray = result;
    });
  }
  setPersonaRequest(): void {
    this.personaRequest.idPersona = this.personaForm.get('idPersona')?.value;
    this.personaRequest.apellidoPaterno =
      this.personaForm.get('apellidoPaterno')?.value;
    this.personaRequest.apellidoMaterno =
      this.personaForm.get('apellidoMaterno')?.value;
    this.personaRequest.nombres = this.personaForm.get('nombres')?.value;
    this.personaRequest.fechaNacimiento =
      this.personaForm.get('fechaNacimiento')?.value;
    this.personaRequest.idTipoDocumento =
      this.personaForm.get('idTipoDocumento')?.value;
    this.personaRequest.ndocumento = this.personaForm.get('ndocumento')?.value;
    this.personaRequest.direccion = this.personaForm.get('direccion')?.value;
    this.personaRequest.idUbigeo = this.personaForm.get('idUbigeo')?.value;
  }
  registrarPersona(): void {
    this.setPersonaRequest();
    if (this.isEdited) this.actualizarPersona();
    else this.insertarPersona();
  }

  actualizarPersona(): void {
    this.personaService.actualizarPersona(this.personaRequest).subscribe(
      (result: any) => {
        this.ngOnInit();
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'actualizarPersona....',
          text: '!Se actualizó exitosamente los datos de la persona!',
        });
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia....',
          text: '!Ah ocurrido un error al actualizar persona!',
        });
      } //cierre del error
    );
  }

  insertarPersona(): void {
    this.setPersonaRequest();
    console.log('personaRequest', this.personaRequest);
    Swal.fire({
      title: 'Esta seguro de registrar los datos de la persona?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.registrarPersona(this.personaRequest).subscribe(
          (result: any) => {
            this.ngOnInit();
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'registrarPersona....',
              text: '!Se registro exitosamente los datos de la persona!',
            });
          },
          (err: any) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Advertencia....',
              text: '!Ah ocurrido un error al registrar persona!',
            });
          } //cierre del error
        ); //cierre del subscribe
      }
    });
  } //cierre del metodo registrarPersona

  eliminarPersona(personaResponse: IPersonaResponse): void {
    this.personaRequest.idPersona = personaResponse.idPersona;
    Swal.fire({
      title: 'Esta seguro de eliminar la persona seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.eliminarPersona(this.personaRequest).subscribe(
          (result: any) => {
            console.log('eliminarPersona', result);
            this.ngOnInit();
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'eliminarPersona....',
              text: '!Se eliminó exitosamente la persona seleccionada!',
            });
          },
          (err: any) => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Advertencia....',
              text: '!Ah ocurrido un error al eliminar persona!',
            });
          } //cierre del error
        );
      }
    });
  }
  editarPersona(personaResponse: IPersonaResponse): void {
    Swal.fire({
      title: 'Esta seguro de editar la persona seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaForm.patchValue({
          idPersona: personaResponse.idPersona,
          apellidoPaterno: personaResponse.apellidoPaterno,
          apellidoMaterno: personaResponse.apellidoMaterno,
          nombres: personaResponse.nombres,
          fechaNacimiento: personaResponse.fechaNacimiento,
          idTipoDocumento: personaResponse?.tipoDocumento?.idTipoDocumento,
          ndocumento: personaResponse.ndocumento,
          direccion: personaResponse.direccion,
          idUbigeo: personaResponse?.ubigeo?.idUbigeo,
        });
        this.isEdited = true;
      }
    });
  }
}
