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
    this.getPersonas();
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
    console.log('personaRequest', this.personaRequest);
    this.personaService
      .registrarPersona(this.personaRequest)
      .subscribe((result: any) => {
        this.ngOnInit();
      });
  }
}
