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
    const token = localStorage.getItem('token');
    if(token) this.route.navigate(['/usuarios']);
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
        localStorage.setItem('token', 'XASDXX');
        this.isLogged = true;
        this.route.navigate(['/usuarios']);
      }else{
        this.success = true;
      }
    }, err => {
      console.log(err);
    });  
  }


}
