import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skills } from 'src/app/models/skills';
import { SkillsService } from 'src/app/servicios/skills.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-hys',
  templateUrl: './hys.component.html',
  styleUrls: ['./hys.component.css']
})
export class HysComponent implements OnInit {
  public skillss:Skills[]=[];
  public editSkills:Skills| undefined;
  public deleteSkills:Skills| undefined;


  constructor(private skillsService:SkillsService,private tokenService: TokenService) { }
  isLogged = false;

  ngOnInit(): void {
    this.getSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getSkills():void{
    this.skillsService.getSkills().subscribe({
      next:(Response:Skills[])=>{
        this.skillss=Response;},
      error:(error:HttpErrorResponse)=>{
      alert(error.message);}
    })
  }
  public onOpenModal(mode:String, skills?: Skills):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addSkillsModal');
    }else if(mode==='delete'){
      this.deleteSkills=skills;
      button.setAttribute('data-target','#deleteSkillsModal');
    }else if(mode==='edit'){
      this.editSkills=skills;
      button.setAttribute('data-target','#editSkillsModal');
    }
    container?.appendChild(button);
    button.click();
  }
  public onAddSkills(addForm:NgForm): void{
    document.getElementById('add-skills-form')?.click();
    this.skillsService.addSkills(addForm.value).subscribe({
      next:(response:Skills)=>{
        console.log(response);
        this.getSkills();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
      alert(error.message);
      addForm.reset();
      }
    })
  }
  public onUpdateSkills(skills:Skills){
    this.editSkills=skills;
    document.getElementById('add-skills-form')?.click();
    this.skillsService.updateSkills(skills).subscribe({
      next:(response:Skills)=>{
        console.log(response);
        this.getSkills();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);}
    })
  }
  public onDeleteSkills(idSkill: number):void{
    this.skillsService.deleteSkills(idSkill).subscribe({
      next:(response:void)=>{
        console.log(response);
        this.getSkills();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);}
    })
  }
  
  }
