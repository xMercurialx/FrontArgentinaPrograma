import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skills } from '../models/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skillsUrl='https://argentinaback.herokuapp.com';

  constructor(private http:HttpClient) { }

  public getSkills():Observable<Skills[]>{
    return this.http.get<Skills[]>(`${this.skillsUrl}/skills/all`);}
    
  public addSkills(skills:Skills):Observable<Skills>{
    return this.http.post<Skills>(`${this.skillsUrl}/skills/add`,skills);}
  
  public updateSkills(skills:Skills):Observable<Skills>{
    return this.http.put<Skills>(`${this.skillsUrl}/skills/update`,skills);}
  
  public deleteSkills(skillsId: number):Observable<void>{
    return this.http.delete<void>(`${this.skillsUrl}/skills/delete/${skillsId}`);}
}

