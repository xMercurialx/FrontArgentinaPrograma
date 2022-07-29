import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skills } from '../models/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiServerUrl='https://argentinaback.herokuapp.com/';

  constructor(private http:HttpClient) { }

  public getSkills():Observable<Skills[]>{
    return this.http.get<Skills[]>(`${this.apiServerUrl}/skills/all`);}
    
  public addSkills(skills:Skills):Observable<Skills>{
    return this.http.post<Skills>(`${this.apiServerUrl}/skills/add`,skills);}
  
  public updateSkills(skills:Skills):Observable<Skills>{
    return this.http.put<Skills>(`${this.apiServerUrl}/skills/update`,skills);}
  
  public deleteSkills(skillsId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/skills/delete/${skillsId}`);}
}

