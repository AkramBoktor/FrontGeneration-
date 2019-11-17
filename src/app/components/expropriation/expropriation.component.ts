
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-expropriation',
  templateUrl: './expropriation.component.html'
})
export class ExpropriationComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

