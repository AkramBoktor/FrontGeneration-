
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-assay-building-weight-factor-list',
  templateUrl: './assay-building-weight-factor-list.component.html'
})
export class AssayBuildingWeightFactorListComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

