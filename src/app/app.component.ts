import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

@Component({
  selector: 'my-app',
  styleUrls: ['main.scss', './app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  views = views;

  rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  columns = [
    { prop: 'name' },
    { name: 'Description' },
    { name: 'Price' },
    { prop: 'url'}
  ];

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.fetch((data) => {
      this.rows = data;
      //setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/menu.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}
