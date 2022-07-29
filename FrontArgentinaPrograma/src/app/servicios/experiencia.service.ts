import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private expUrl='https://argentinaback.herokuapp.com';

  constructor(private http:HttpClient) {}
    public getExperiencia():Observable<Experiencia[]>{
      return this.http.get<Experiencia[]>(`${this.expUrl}/experiencia/all`);}
      
    public addExperiencia(experiencia:Experiencia):Observable<Experiencia>{
      return this.http.post<Experiencia>(`${this.expUrl}/experiencia/add`,experiencia);}
    
    public updateExperiencia(experiencia:Experiencia):Observable<Experiencia>{
      return this.http.put<Experiencia>(`${this.expUrl}/experiencia/update`,experiencia);}
    
    public deleteExperiencia(experienciaId: number):Observable<void>{
      return this.http.delete<void>(`${this.expUrl}/experiencia/delete/${experienciaId}`);
  }
}