
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionValueByAgeG } from 'app/shared/models/subscription-value-by-age-g';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionValueByAgeGEditComponent } from '../subscription-value-by-age-g-edit/subscription-value-by-age-g-edit.component';
import { SubscriptionValueByAgeGNewComponent } from '../subscription-value-by-age-g-new/subscription-value-by-age-g-new.component';
import { SubscriptionValueByAgeGViewComponent } from '../subscription-value-by-age-g-view/subscription-value-by-age-g-view.component';
import { SubscriptionValueByAgeGService } from '../shared/subscription-value-by-age-g.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-value-by-age-g-list',
  templateUrl: './subscription-value-by-age-g-list.component.html',
  styleUrls: ['./subscription-value-by-age-g-list.component.scss'],
  providers: []
})

export class SubscriptionValueByAgeGListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSubscriptionValueByAgeG: SubscriptionValueByAgeG;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'السن', field: 'age' }),
	new GridColumnOptions({ headerName: 'القيمه', field: 'amount' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscriptionValueByAgeGViewComponent,
    editDialogClassType: SubscriptionValueByAgeGEditComponent,
    newDialogClassType: SubscriptionValueByAgeGNewComponent,
  });
    constructor(
        injector: Injector,
        public subscriptionValueByAgeGService: SubscriptionValueByAgeGService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeG = new SubscriptionValueByAgeG();

    

    this.searchForm = this.formBuilder.group({
     	age : []
    });

     
  }

  getSubscriptionValuesByAgePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriptionValueByAgeG[]> => {
    return this.subscriptionValueByAgeGService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriptionValueByAgeGService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    
  }
}

