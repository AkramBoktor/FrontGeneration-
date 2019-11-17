
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-assay-unctions-of-items-and-elements-of-the-project',
  templateUrl: './assay-unctions-of-items-and-elements-of-the-project.component.html'
})
export class AssayUnctionsOfItemsAndElementsOfTheProjectComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

