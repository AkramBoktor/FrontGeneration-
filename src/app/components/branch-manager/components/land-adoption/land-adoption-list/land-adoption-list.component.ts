
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LandAdoption } from 'app/shared/models/land-adoption';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LandAdoptionEditComponent } from '../land-adoption-edit/land-adoption-edit.component';
import { LandAdoptionNewComponent } from '../land-adoption-new/land-adoption-new.component';
import { LandAdoptionViewComponent } from '../land-adoption-view/land-adoption-view.component';
import { LandAdoptionService } from '../shared/land-adoption.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-land-adoption-list',
  templateUrl: './land-adoption-list.component.html',
  styleUrls: ['./land-adoption-list.component.scss'],
  providers: []
})

export class LandAdoptionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private rejectionReasonCodesService: LookupService;

  
rejectionReasonCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('rejectionReasonCode', { static: true }) RejectionReasonCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedLandAdoption: LandAdoption;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود قطعه ارض', field: 'landCode' }),
	new GridColumnOptions({ headerName: 'كود النموزج', field: 'modelCode' }),
	new GridColumnOptions({ headerName: 'تاريخ الاعتماد', field: 'accreditationDate' }),
	new GridColumnOptions({ headerName: 'ملاحظات', field: 'notes' }),
	new GridColumnOptions({ headerName: 'المرحله المقترحه', field: 'proposedPhase' }),
	new GridColumnOptions({ headerName: 'صلاحية الأرض', field: 'landValidity' }),
	new GridColumnOptions({ headerName: 'كود سبب الرفض', field: 'rejectionReasonCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LandAdoptionViewComponent,
    editDialogClassType: LandAdoptionEditComponent,
    newDialogClassType: LandAdoptionNewComponent,
  });
    constructor(
        injector: Injector,
        public landAdoptionService: LandAdoptionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLandAdoption = new LandAdoption();

    
	this.rejectionReasonCodeSelectOptions = new MaterialSelectOptions({
	 data: this.rejectionReasonCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود سبب الرفض',
	});


    this.searchForm = this.formBuilder.group({
     	landCode : [],
	modelCode : [],
	rejectionReasonCode : []
    });

     
  }

  getLandAdoptionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LandAdoption[]> => {
    return this.landAdoptionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.landAdoptionService.delete(param.data.id)
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
    this.rejectionReasonCodesService = new LookupService('rejectionreasoncodes', this.http);
  }
}

