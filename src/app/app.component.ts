import { Component } from '@angular/core';
import { DrawService } from './services/tree/draw.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'Arbol2';

  constructor(drawService : DrawService) {
    drawService.drawTree();
  }
}
