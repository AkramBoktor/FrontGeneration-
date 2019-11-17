
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-free-query-for-statistical-bulletin',
  templateUrl: './free-query-for-statistical-bulletin.component.html'
})
export class FreeQueryForStatisticalBulletinComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

