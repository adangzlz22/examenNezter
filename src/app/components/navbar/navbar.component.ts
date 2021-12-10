import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoged:any = false;
  constructor(private route: Router
              ,private service: ApiService) { }


  ngOnInit(): void {
    this.isLoged=this.service.isLogged;
  }


  CerrarSesion(){
    this.isLoged=false;
    this.service.isLogged=false;
    this.route.navigate(['/login']);
  }

}
