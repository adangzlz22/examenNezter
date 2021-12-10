import { OnDestroy, ViewChild, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';  
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  title = 'Create User';
  closeResult:string = '';
  users = [];
  constructor(private route: Router,private userService: ApiService,private modalService: NgbModal ) { }

  ngOnInit(): void {
    if (!this.userService.isLogged) {
      this.route.navigate(['/login']);
    }
    this.getUsers();
  }
  getUsers(): void {
    const objModel = {};
    this.userService.post('Login/ObtenerUsuarios',objModel).subscribe( result => {
      this.users = JSON.parse(result['Model']);
    });
  }

  openModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

}
