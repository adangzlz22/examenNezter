import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged:any = false;
  constructor(private route: Router
              ,private service: ApiService) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token) {this.isLogged = true}else{
      this.isLogged = false;
    }

  }
  logOut(){
    this.isLogged=false;
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

}
