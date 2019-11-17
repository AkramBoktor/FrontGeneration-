
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-assay-assay-list-building-models-work',
  templateUrl: './assay-assay-list-building-models-work.component.html'
})
export class AssayAssayListBuildingModelsWorkComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

