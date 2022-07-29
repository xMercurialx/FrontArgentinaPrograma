import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyectos } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private proyUrl='https://argentinaback.herokuapp.com';

  constructor(private http:HttpClient) { }

  public getProyectos():Observable<Proyectos[]>{
    return this.http.get<Proyectos[]>(`${this.proyUrl}/proyectos/all`);}
    
  public addProyectos(proyectos:Proyectos):Observable<Proyectos>{
    return this.http.post<Proyectos>(`${this.proyUrl}/proyectos/add`,proyectos);}
  
  public updateProyectos(proyectos:Proyectos):Observable<Proyectos>{
    return this.http.put<Proyectos>(`${this.proyUrl}/proyectos/update`,proyectos);}
  
  public deleteProyectos(proyectosId: number):Observable<void>{
    return this.http.delete<void>(`${this.proyUrl}/proyectos/delete/${proyectosId}`);}
}
