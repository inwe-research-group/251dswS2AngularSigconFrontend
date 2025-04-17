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

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './registrar-persona.component.html',
  styleUrl: './registrar-persona.component.css',
})
export class RegistrarPersonaComponent {
  personaArray: IPersonaResponse[] = [];
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
}
