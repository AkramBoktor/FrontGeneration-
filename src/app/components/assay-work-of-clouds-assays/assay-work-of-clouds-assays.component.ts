
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-assay-work-of-clouds-assays',
  templateUrl: './assay-work-of-clouds-assays.component.html'
})
export class AssayWorkOfCloudsAssaysComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

