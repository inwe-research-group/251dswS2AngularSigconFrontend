import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPersonaResponse } from '../model/persona-response';
import { BASE_URL } from '../utils/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  constructor(private http: HttpClient) {}
  getPersonas(): Observable<IPersonaResponse[]> {
    return this.http.get<IPersonaResponse[]>(`${BASE_URL}/persona`);
  }
}
