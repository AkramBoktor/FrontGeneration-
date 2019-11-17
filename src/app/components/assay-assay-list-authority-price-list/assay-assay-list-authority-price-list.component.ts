
import { Component,OnInit, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';

@Component({
  selector: 'app-assay-assay-list-authority-price-list',
  templateUrl: './assay-assay-list-authority-price-list.component.html'
})
export class AssayAssayListAuthorityPriceListComponent extends AppBaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
   }

  ngOnInit() {
  }
}

