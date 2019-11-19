
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EnvelopesOpennigCommetyData } from 'app/shared/models/envelopes-opennig-commety-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnvelopesOpennigCommetyDataEditComponent } from '../envelopes-opennig-commety-data-edit/envelopes-opennig-commety-data-edit.component';
import { EnvelopesOpennigCommetyDataNewComponent } from '../envelopes-opennig-commety-data-new/envelopes-opennig-commety-data-new.component';
import { EnvelopesOpennigCommetyDataViewComponent } from '../envelopes-opennig-commety-data-view/envelopes-opennig-commety-data-view.component';
import { EnvelopesOpennigCommetyDataService } from '../shared/envelopes-opennig-commety-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-envelopes-opennig-commety-data-list',
  templateUrl: './envelopes-opennig-commety-data-list.component.html',
  styleUrls: ['./envelopes-opennig-commety-data-list.component.scss'],
  providers: []
})

export class EnvelopesOpennigCommetyDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEnvelopesOpennigCommetyData: EnvelopesOpennigCommetyData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم مناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ انعقاد اللجنة', field: 'committeeDate' }),
	new GridColumnOptions({ headerName: 'مقر انعقاد اللجنة', field: 'committeeHeadquarters' }),
	new GridColumnOptions({ headerName: 'تاريخ الموافقة على الطرح', field: 'offeringApprovalDate' }),
	new GridColumnOptions({ headerName: 'تاريخ فتح المظاريف المالي', field: 'openingFinancialEnvelopesDate' }),
	new GridColumnOptions({ headerName: 'تاريخ الموافقة على التشكيل', field: 'approvalFormationDate' }),
	new GridColumnOptions({ headerName: 'موقف المناقصة من التقصير', field: 'tenderPosition' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EnvelopesOpennigCommetyDataViewComponent,
    editDialogClassType: EnvelopesOpennigCommetyDataEditComponent,
    newDialogClassType: EnvelopesOpennigCommetyDataNewComponent,
  });
    constructor(
        injector: Injector,
        public envelopesOpennigCommetyDataService: EnvelopesOpennigCommetyDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEnvelopesOpennigCommetyData = new EnvelopesOpennigCommetyData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	committeeDate : [],
	committeeHeadquarters : [],
	offeringApprovalDate : [],
	openingFinancialEnvelopesDate : [],
	approvalFormationDate : [],
	tenderPosition : [],
	offeringType : []
    });

     
  }

  getEnvelopesOpennigCommetyDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EnvelopesOpennigCommetyData[]> => {
    return this.envelopesOpennigCommetyDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.envelopesOpennigCommetyDataService.delete(param.data.id)
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
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

