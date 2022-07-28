import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public proyectosz:Proyectos[]=[];
  public editProyectos:Proyectos| undefined;
  public deleteProyectos:Proyectos | undefined;
  

  constructor(private proyectosService:ProyectosService,private tokenService: TokenService ) { }
  isLogged = false;

  ngOnInit(): void {
    this.getProyectosz();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  public getProyectosz():void{
    this.proyectosService.getProyectos().subscribe({
      next:(Response:Proyectos[])=>{
        this.proyectosz=Response;},
      error:(error:HttpErrorResponse)=>{
      alert(error.message);}
    })
  }
  public onOpenModal(mode:String, proyectos?: Proyectos):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addProyectosModal');
    }else if(mode==='delete'){
      this.deleteProyectos=proyectos;
      button.setAttribute('data-target','#deleteProyectosModal');
    }else if(mode==='edit'){
      this.editProyectos=proyectos;
      button.setAttribute('data-target','#editProyectosModal');
    }
    container?.appendChild(button);
    button.click();
  }
  public onAddProyectos(addForm:NgForm): void{
    document.getElementById('add-proyectos-form')?.click();
    this.proyectosService.addProyectos(addForm.value).subscribe({
      next:(response:Proyectos)=>{
        console.log(response);
        this.getProyectosz();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
      alert(error.message);
      addForm.reset();
      }
    })
  }
  public onUpdateProyectos(proyectos:Proyectos){
    this.editProyectos=proyectos;
    document.getElementById('add-proyectos-form')?.click();
    this.proyectosService.updateProyectos(proyectos).subscribe({
      next:(response:Proyectos)=>{
        console.log(response);
        this.getProyectosz();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);}
    })
  }
  public onDeleteProyectos(idProy: number):void{
    this.proyectosService.deleteProyectos(idProy).subscribe({
      next:(response:void)=>{
        console.log(response);
        this.getProyectosz();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);}
    })
  }
  
  }

