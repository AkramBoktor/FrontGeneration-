
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-assay-assay-list-standardization-subsystem-code',
  templateUrl: './assay-assay-list-standardization-subsystem-code.component.html'
})
export class AssayAssayListStandardizationSubsystemCodeComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

