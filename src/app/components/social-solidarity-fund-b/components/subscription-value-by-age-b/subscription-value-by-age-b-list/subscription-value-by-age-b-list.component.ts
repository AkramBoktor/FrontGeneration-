
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionValueByAgeB } from 'app/shared/models/subscription-value-by-age-b';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionValueByAgeBEditComponent } from '../subscription-value-by-age-b-edit/subscription-value-by-age-b-edit.component';
import { SubscriptionValueByAgeBNewComponent } from '../subscription-value-by-age-b-new/subscription-value-by-age-b-new.component';
import { SubscriptionValueByAgeBViewComponent } from '../subscription-value-by-age-b-view/subscription-value-by-age-b-view.component';
import { SubscriptionValueByAgeBService } from '../shared/subscription-value-by-age-b.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-value-by-age-b-list',
  templateUrl: './subscription-value-by-age-b-list.component.html',
  styleUrls: ['./subscription-value-by-age-b-list.component.scss'],
  providers: []
})

export class SubscriptionValueByAgeBListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSubscriptionValueByAgeB: SubscriptionValueByAgeB;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'القيمه', field: 'amount' }),
	new GridColumnOptions({ headerName: 'السن', field: 'age' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscriptionValueByAgeBViewComponent,
    editDialogClassType: SubscriptionValueByAgeBEditComponent,
    newDialogClassType: SubscriptionValueByAgeBNewComponent,
  });
    constructor(
        injector: Injector,
        public subscriptionValueByAgeBService: SubscriptionValueByAgeBService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeB = new SubscriptionValueByAgeB();

    

    this.searchForm = this.formBuilder.group({
     	age : []
    });

     
  }

  getSubscriptionValuesByAgePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriptionValueByAgeB[]> => {
    return this.subscriptionValueByAgeBService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriptionValueByAgeBService.delete(param.data.id)
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

