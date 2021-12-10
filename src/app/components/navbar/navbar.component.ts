import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { utileriasService } from 'src/app/services/utilerias';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoged:any = false;
  constructor(private route: Router
              ,private service: utileriasService) { }


  ngOnInit(): void {
    this.isLoged=this.service.isLoged;
  }


  CerrarSesion(){
    this.isLoged=false;
    this.service.isLoged=false;
    this.route.navigate(['/login']);
  }

}
