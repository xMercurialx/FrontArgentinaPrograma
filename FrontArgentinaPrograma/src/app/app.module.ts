import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BanerComponent } from './componentes/baner/baner.component';
import { EducationComponent } from './componentes/education/education.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './componentes/home/home.component';
import { HysComponent } from './componentes/hys/hys.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { LogoComponent } from './componentes/logo/logo.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { SocialComponent } from './componentes/social/social.component';


@NgModule({
  declarations: [
    AppComponent,
    BanerComponent,
    EducationComponent,
    ExperienciaComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    HysComponent,
    InicioComponent,
    LoginComponent,
    LogoComponent,
    ProyectosComponent,
    SocialComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgCircleProgressModule.forRoot(
      {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
