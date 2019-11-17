
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-assay',
  templateUrl: './assay.component.html'
})
export class AssayComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

