
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-competitions-personnel-affairs',
  templateUrl: './competitions-personnel-affairs.component.html'
})
export class CompetitionsPersonnelAffairsComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

