
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SubscriptionValueByAgeA } from 'app/shared/models/subscription-value-by-age-a';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SubscriptionValueByAgeAEditComponent } from '../subscription-value-by-age-a-edit/subscription-value-by-age-a-edit.component';
import { SubscriptionValueByAgeANewComponent } from '../subscription-value-by-age-a-new/subscription-value-by-age-a-new.component';
import { SubscriptionValueByAgeAViewComponent } from '../subscription-value-by-age-a-view/subscription-value-by-age-a-view.component';
import { SubscriptionValueByAgeAService } from '../shared/subscription-value-by-age-a.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-subscription-value-by-age-a-list',
  templateUrl: './subscription-value-by-age-a-list.component.html',
  styleUrls: ['./subscription-value-by-age-a-list.component.scss'],
  providers: []
})

export class SubscriptionValueByAgeAListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSubscriptionValueByAgeA: SubscriptionValueByAgeA;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'السن', field: 'age' }),
	new GridColumnOptions({ headerName: 'القيمه', field: 'amount' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SubscriptionValueByAgeAViewComponent,
    editDialogClassType: SubscriptionValueByAgeAEditComponent,
    newDialogClassType: SubscriptionValueByAgeANewComponent,
  });
    constructor(
        injector: Injector,
        public subscriptionValueByAgeAService: SubscriptionValueByAgeAService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSubscriptionValueByAgeA = new SubscriptionValueByAgeA();

    

    this.searchForm = this.formBuilder.group({
     	age : []
    });

     
  }

  getSubscriptionValuesByAgePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SubscriptionValueByAgeA[]> => {
    return this.subscriptionValueByAgeAService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.subscriptionValueByAgeAService.delete(param.data.id)
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

