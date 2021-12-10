import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';  
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tokenName } from '@angular/compiler';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  title = 'Create User';
  typeOfAction = 'Create User';
  closeResult:string = '';
  users: any = [];
  cities: any = [];
  states: any = [];
  user: any = {}

  subscriptions: Subscription[] = [];

  form = new FormGroup({
    Nombre: new FormControl(''),
    UserName : new FormControl(''),
    PassName : new FormControl(''),
    Direccion :new FormControl(''),
    Telefono : new FormControl(''),
    CodigoPostal:new FormControl(''),
    TipoUsuario :new FormControl(''),
    idPais : new FormControl('1'),
    idEstado : new FormControl(''),
    idCiudad : new FormControl(''),

  });

  constructor(private route: Router,private userService: ApiService,private modalService: NgbModal ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      this.getUsers();
      this.getStates();
    }else{
      this.route.navigate(['/login']);
    }
  }
  getUsers(): void {
    const objModel = {};
    this.userService.post('Login/ObtenerUsuarios',objModel).subscribe( result => {
      this.users = JSON.parse(result['Model']);
    });
  }
  updateUser(user:any){
    this.user = user;
  }

  openModal(content:any): void {
    if(!this.user.idUsuario){
      this.title = 'Create User'
    };
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getCities(id:any): void {
    const objModel = {
      idEstado: id
    };
    this.userService.post('Login/cboMunicipio',objModel).subscribe( result => {
      this.cities = JSON.parse(result['Model']);
    });
  }

  getStates(): void {
    const objModel = {
      idPais:1
    };
    this.userService.post('Login/cboEstado',objModel).subscribe( result => {
      this.states = JSON.parse(result['Model']);
    });
  }

  deleteUser(id:string){
    const objModel = {
      idUsuario:id
    };
    this.userService.post('Login/EliminarUsuario',objModel).subscribe( result => {
      this.states = JSON.parse(result['Model']);
      this.getUsers();
    });
  }

  onChange() {
    this.getCities(this.form.get('idEstado')?.value);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  post(){
    if(this.user.idUsuario){
      const objModel = this.form.value;
      this.userService.post('Login/EditarUsuario',objModel).subscribe( result => {
        this.states = JSON.parse(result['Model']);
        this.getUsers();
      });
      this.user = {};
    }else{
      const objModel = this.form.value;
      this.userService.post('Login/CrearUsuario',objModel).subscribe( result => {
        this.users = JSON.parse(result['Model']);
        this.getUsers();
      });
    }

  }

}
