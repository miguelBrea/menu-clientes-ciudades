import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Clientes', url: '/customer', icon: 'people' },
    { title: 'Ciudades', url: '/cities', icon: 'location' },
    { title: 'Login', url: '/login', icon: 'log-in' }
  ];
  constructor() {}
}
