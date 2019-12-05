
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LandAllocationDecisionData } from 'app/shared/models/land-allocation-decision-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LandAllocationDecisionDataEditComponent } from '../land-allocation-decision-data-edit/land-allocation-decision-data-edit.component';
import { LandAllocationDecisionDataNewComponent } from '../land-allocation-decision-data-new/land-allocation-decision-data-new.component';
import { LandAllocationDecisionDataViewComponent } from '../land-allocation-decision-data-view/land-allocation-decision-data-view.component';
import { LandAllocationDecisionDataService } from '../shared/land-allocation-decision-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-land-allocation-decision-data-list',
  templateUrl: './land-allocation-decision-data-list.component.html',
  styleUrls: ['./land-allocation-decision-data-list.component.scss'],
  providers: []
})

export class LandAllocationDecisionDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private allocationTypeCodesService: LookupService;

  
allocationTypeCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('allocationTypeCode', { static: true }) AllocationTypeCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLandAllocationDecisionData: LandAllocationDecisionData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الرقم التعريفى', field: 'landID' }),
	new GridColumnOptions({ headerName: 'رقم التخصيص', field: 'allocationNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ التخصيص', field: 'allocationDate' }),
	new GridColumnOptions({ headerName: 'نوع التخصيص', field: 'allocationTypeCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LandAllocationDecisionDataViewComponent,
    editDialogClassType: LandAllocationDecisionDataEditComponent,
    newDialogClassType: LandAllocationDecisionDataNewComponent,
  });
    constructor(
        injector: Injector,
        public landAllocationDecisionDataService: LandAllocationDecisionDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLandAllocationDecisionData = new LandAllocationDecisionData();

    
	this.allocationTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.allocationTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التخصيص',
	});


    this.searchForm = this.formBuilder.group({
     	landID : [],
	allocationNumber : [],
	allocationDate : [],
	allocationTypeCode : []
    });

     
  }

  getLandAllocationDecisionDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LandAllocationDecisionData[]> => {
    return this.landAllocationDecisionDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.landAllocationDecisionDataService.delete(param.data.id)
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
    this.allocationTypeCodesService = new LookupService('allocationtypecodes', this.http);
  }
}

