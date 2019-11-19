
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-assay-list-of-creation-of-works-of-others',
  templateUrl: './assay-list-of-creation-of-works-of-others.component.html'
})
export class AssayListOfCreationOfWorksOfOthersComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

