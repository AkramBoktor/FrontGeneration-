
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BusinessCostChecks } from 'app/shared/models/business-cost-checks';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BusinessCostChecksEditComponent } from '../business-cost-checks-edit/business-cost-checks-edit.component';
import { BusinessCostChecksNewComponent } from '../business-cost-checks-new/business-cost-checks-new.component';
import { BusinessCostChecksViewComponent } from '../business-cost-checks-view/business-cost-checks-view.component';
import { BusinessCostChecksService } from '../shared/business-cost-checks.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-business-cost-checks-list',
  templateUrl: './business-cost-checks-list.component.html',
  styleUrls: ['./business-cost-checks-list.component.scss'],
  providers: []
})

export class BusinessCostChecksListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedBusinessCostChecks: BusinessCostChecks;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المدرسة', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم الشيك', field: 'checkNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الشيك', field: 'checkDate' }),
	new GridColumnOptions({ headerName: 'قيمة الشيك', field: 'checkValue' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BusinessCostChecksViewComponent,
    editDialogClassType: BusinessCostChecksEditComponent,
    newDialogClassType: BusinessCostChecksNewComponent,
  });
    constructor(
        injector: Injector,
        public businessCostChecksService: BusinessCostChecksService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBusinessCostChecks = new BusinessCostChecks();

    

    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	checkNumber : [],
	checkDate : [],
	checkValue : []
    });

     
  }

  getBusinessCostChecksPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BusinessCostChecks[]> => {
    return this.businessCostChecksService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.businessCostChecksService.delete(param.data.id)
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

