import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  /*
    Nuesta pagina city va ir por el id, enrutado
  */
  id: any;
  cities: any = [];
  //ponemos aqui las variables de la informacion que queremos extraer
  name: any;
  image: any;
  description: any;


  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //para enrutar por id necesitamos lo siguiente
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id',this.id);
    this.getCities()
        .subscribe(res =>{
                            this.cities = res;
                            //obtengo los valores deseados a la llamada
                            this.name = this.cities[this.id].name;
                            this.description = this.cities[this.id].description;
                            this.image = this.cities[this.id].image;
                          });
  }

  getCities(){
    return this.http
           .get('../../assets/files/cities.json') //ruta del archivo json
           .pipe( //aqui usamos map para indicarle que datos coger
                map((res: any)=>res.data));
  }

}
