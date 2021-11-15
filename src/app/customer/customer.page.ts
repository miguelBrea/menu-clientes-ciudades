import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/*Necesitamos importar http para cargar desde los archivos json*/
import { HttpClient } from '@angular/common/http';
//Vamos a importar el map para poder mapear bien los valores
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  users: any = []; //variable para recoger los datos json

  //esta variable indicara si un usuario tiene permiso o no
  permisson: boolean;

  //variable para el usuario que se esta usando
  searchedUser: any = [];

  /*
    Tenemos que inyectar el plugin al constructor
    para poder usarlo
  */
  constructor(private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.permisson = true;

    /*
      Llamamo a la funcion cuando se visualice la pagina customer
      Para ello nos subcribimos a http, y le pasamos una funcion
      que es la que va a realizar
    */
    this.getUsers().subscribe(
      res => { console.log('Res', res);
      this.users = res;
      this.searchedUser = this.users;}//usaremos para el buscador
    );

  }
  //para llamar a consulta los datos del json
  getUsers(){
    return this.http
           .get('../../assets/files/customers.json') //ruta del archivo json
           .pipe( //aqui usamos map para indicarle que datos coger
                map((res: any)=>res.data));
  }


  //este metodo es una prueba que hice para enrutar un boton
  //con la pagina home
  irAHome(){
    this.router.navigate(['../home']);
  }

  //metodo para buscar y filtrar por el texto
  searchCustomer(event){
    const text = event.target.value;
    this.searchedUser = this.users;
    // eslint-disable-next-line eqeqeq
    if(text && text.trim() != ''){
      this.searchedUser = this.searchedUser
                              .filter((user: any) =>
                              (user.name.toLowerCase()
                              .indexOf(text.toLowerCase()) > -1));
    }
  }

  //funcion para refrescar lista de clientes con el scroll
  doRefresh(event) {
    this.getUsers();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
