
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-office-of-the-director-of-the-commission',
  templateUrl: './office-of-the-director-of-the-commission.component.html'
})
export class OfficeOfTheDirectorOfTheCommissionComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

