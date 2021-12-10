import { OnDestroy, ViewChild, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  users = [];
  constructor(private route: Router,private userService: ApiService) { }

  ngOnInit(): void {
    if (!this.userService.isLogged) {
      this.route.navigate(['/login']);
    }
    this.getusers();
  }
  getusers(): void {
    const objModel = {};
    this.userService.post('Login/ObtenerUsuarios',objModel).subscribe( result => {
      this.users = JSON.parse(result['Model']);
    });
  }

}
