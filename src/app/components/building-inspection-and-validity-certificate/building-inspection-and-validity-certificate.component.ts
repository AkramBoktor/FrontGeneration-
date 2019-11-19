
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-building-inspection-and-validity-certificate',
  templateUrl: './building-inspection-and-validity-certificate.component.html'
})
export class BuildingInspectionAndValidityCertificateComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

