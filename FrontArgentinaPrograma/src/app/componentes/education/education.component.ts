import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/servicios/education.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  public educations:Education[]=[];
  public editEducation:Education | undefined;
  public deleteEducation:Education | undefined;

  constructor(private educationService:EducationService,private tokenService: TokenService) { }

  isLogged = false;

  ngOnInit(): void {
    this.getEducations();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  
  public getEducations():void{
    this.educationService.getEducation().subscribe({
      next:(Response:Education[])=>{
        this.educations=Response;},
      error:(error:HttpErrorResponse)=>{
      alert(error.message);}
    })
  }
  public onOpenModal(mode:String, education?: Education):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addEducationModal');
    }else if(mode==='delete'){
      this.deleteEducation=education;
      button.setAttribute('data-target','#deleteEducationModal');
    }else if(mode==='edit'){
      this.editEducation=education;
      button.setAttribute('data-target','#editEducationModal');
    }
    container?.appendChild(button);
    button.click();
  }
  public onAddEducation(addForm:NgForm): void{
    document.getElementById('add-education-form')?.click();
    this.educationService.addEducation(addForm.value).subscribe({
      next:(response:Education)=>{
        console.log(response);
        this.getEducations();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
      alert(error.message);
      addForm.reset();
      }
    })
  }
  public onUpdateEducation(education:Education){
    this.editEducation=education;
    document.getElementById('add-education-form')?.click();
    this.educationService.updateEducation(education).subscribe({
      next:(response:Education)=>{
        console.log(response);
        this.getEducations();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);}
    })
  }
  public onDeleteEducation(idEdu: number):void{
    this.educationService.deleteEducation(idEdu).subscribe({
      next:(response:void)=>{
        console.log(response);
        this.getEducations();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);}
    })
  }
  
  }
