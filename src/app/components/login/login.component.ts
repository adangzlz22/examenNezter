import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  username = '';
  password = '';
  success = false;
  error = 'Usuario o contraseña incorrecta.';
  constructor(private route: Router
              ,private userService: ApiService
              ) { }

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged;
  }

  login(){
     const objModel = {
      UserName:this.username,
      PassName:this.password
    }
    this.userService.post('Login/Logearse',objModel).subscribe( result=>{
      this.username=JSON.parse(result['Model']);
      console.log('logeado')
      console.log(this.username);
      if (this.username != null) {
        this.userService.isLogged = true;
        this.isLogged = this.userService.isLogged;
        this.route.navigate(['/usuarios']);
      }else{
        this.success = true;
      }
    }, err => {
      console.log(err);
    });  
  }


}
