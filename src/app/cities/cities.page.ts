import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})

export class CitiesPage implements OnInit {


  token = localStorage.getItem('token');
  cities: any = [];

  constructor(private http: HttpClient,
              private router: Router,
              public toastController: ToastController,
              public alertController: AlertController) { }

  ngOnInit(){
    //mostramos por consola el dato almacenado y luego lo borramos
    console.log('token ',this.token);
    localStorage.removeItem('token');
    //tambien puedes usar localStorage.clear() para borrar todos los elementos
    this.getCities()
        .subscribe(res => this.cities = res);
  }
  getCities(){
    return this.http
           .get('../../assets/files/cities.json') //ruta del archivo json
           .pipe( //aqui usamos map para indicarle que datos coger
                map((res: any)=>res.data));
  }

  //metodo que mostrara un toast en unos segundos
  async presentToast1(){
    const toast = await this.toastController.create({
      message: `Ciudad Seleccionada`,
      duration: 1000,
      position: 'bottom'}
      );
    //tenemos que llamarlo
    toast.present();
  }

  //metodo que mostrara un alert donde el usuario debe de interactuar
  async presentAlert1(){
    const alert = this.alertController.create({
      header: 'Borrar ciudad',
      message: 'Se ha borrado la ciudad correctamente',
      buttons: ['OK']
    });
    (await alert).present();
    const result = await (await alert).onDidDismiss();
  }

  //Este alert va a tener dos botones que van hacer diferentes
  //funcionalidades, como se indica a continuación
  async presentAlert2(){
    const alert = this.alertController.create({
      header: 'Borrar ciudad',
      message: '¿Estas seguro?',
      buttons: [
            {
              text: 'No',
              handler: ()=>{ //indicamos la funcion del boton
                console.log('De acuerdo no borramos, gracias');
              },
            },
            {
              text: 'Si',
              handler: ()=>{ //indicamos la funcion del boton
                console.log('Eliminando');
              }
            }
       ]
    });
    (await alert).present();
    const result = await (await alert).onDidDismiss();
  }

}
