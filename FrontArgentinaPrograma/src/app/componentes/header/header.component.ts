import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { HeaderService } from 'src/app/servicios/header.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public persona : Persona | undefined;
  public editPersona: Persona | undefined;

  constructor(private headerService : HeaderService,private tokenService: TokenService) { }
  isLogged = false;

  ngOnInit(): void {
    this.getUser();if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

    public getUser():void{ 
      this.headerService.getUser().subscribe({
      next:(response:Persona)=> {
        this.persona=response;},
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
        }
      })
  }
  
  public onOpenModal(mode:String, persona?: Persona):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='edit'){
      this.editPersona=persona;
      button.setAttribute('data-target','#editPersonaModal');
    }
    container?.appendChild(button);
    button.click();
  }
  public onUpdatePersona(proyectos:Persona){
    this.editPersona=proyectos;
    document.getElementById('add-persona-form')?.click();
    this.headerService.updatePersona(proyectos).subscribe({
      next:(response:Persona)=>{
        console.log(response);
        this.getUser();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);}
    })
}
}
