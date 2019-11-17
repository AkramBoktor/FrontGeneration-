
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-research-and-studies',
  templateUrl: './research-and-studies.component.html'
})
export class ResearchAndStudiesComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

