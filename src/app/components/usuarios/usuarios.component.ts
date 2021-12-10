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

  dtOptions: DataTables.Settings = {};
  

  constructor(private route: Router,private service: ApiService) { }

  ngOnInit(): void {
    if (this.service.isLogged == false) {
      this.route.navigate(['/login']);
    }

    this.dtOptions = {
      language: {
        url : '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      },
      ajax: 'data/data.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }
    ]
    };
  }


}
