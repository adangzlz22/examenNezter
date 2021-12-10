import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { utileriasService } from 'src/app/services/utilerias';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoged = false;
  users:any='';
  pass:any='';
  DatosUsuarios:any;
  mensaje:any=false;
  erorr:any='Usurio o contraseña incorrecta.';
  constructor(private route: Router
              ,private util: utileriasService
              ) { }

  ngOnInit(): void {
    this.isLoged = this.util.isLoged;
   
  }

  logearse(){
      console.log('logearse click')
      let objModel = {
      UserName:this.users,
      PassName:this.pass
    }
    console.log(objModel)
    this.util.Post('Login/Logearse',objModel).then( (result:any)=>{
      this.DatosUsuarios=JSON.parse(result['Model']);

      console.log('logeado')
      console.log(this.DatosUsuarios);
      if (this.DatosUsuarios != null) {
        this.util.isLoged = true;
        this.isLoged = this.util.isLoged;
        this.route.navigate(['/usuarios']);
      }else{
        this.mensaje = true;
      }

    }).catch(errr=>{
      console.log(errr)
    });    
  }


}
