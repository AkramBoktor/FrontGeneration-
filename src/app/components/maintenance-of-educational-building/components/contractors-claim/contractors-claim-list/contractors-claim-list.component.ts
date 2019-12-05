
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorsClaim } from 'app/shared/models/contractors-claim';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorsClaimEditComponent } from '../contractors-claim-edit/contractors-claim-edit.component';
import { ContractorsClaimNewComponent } from '../contractors-claim-new/contractors-claim-new.component';
import { ContractorsClaimViewComponent } from '../contractors-claim-view/contractors-claim-view.component';
import { ContractorsClaimService } from '../shared/contractors-claim.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractors-claim-list',
  templateUrl: './contractors-claim-list.component.html',
  styleUrls: ['./contractors-claim-list.component.scss'],
  providers: []
})

export class ContractorsClaimListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;
private offeringTypesService: LookupService;

  
areaCodeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedContractorsClaim: ContractorsClaim;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المطالبه', field: 'claimCode' }),
	new GridColumnOptions({ headerName: 'رقم المدرسه', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'نوع العمل', field: 'workType' }),
	new GridColumnOptions({ headerName: 'اسم المقاول', field: 'contractorName' }),
	new GridColumnOptions({ headerName: 'تاريخ تسليم الموقع', field: 'siteDeliveryDate' }),
	new GridColumnOptions({ headerName: 'نوع المطالبه', field: 'claimType' }),
	new GridColumnOptions({ headerName: 'مده التنفيذ', field: 'executionDuration' }),
	new GridColumnOptions({ headerName: 'تاريخ المطالبه', field: 'claimDate' }),
	new GridColumnOptions({ headerName: 'مهندس مشرف', field: 'supervisingEngineer' }),
	new GridColumnOptions({ headerName: 'كود المنطقه', field: 'areaCode' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContractorsClaimViewComponent,
    editDialogClassType: ContractorsClaimEditComponent,
    newDialogClassType: ContractorsClaimNewComponent,
  });
    constructor(
        injector: Injector,
        public contractorsClaimService: ContractorsClaimService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContractorsClaim = new ContractorsClaim();

    
	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقه',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	bidNumber : [],
	contractorName : [],
	claimType : [],
	areaCode : [],
	offeringType : []
    });

     
  }

  getContractorsClaimPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContractorsClaim[]> => {
    return this.contractorsClaimService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contractorsClaimService.delete(param.data.id)
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
    this.areasService = new LookupService('areas', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

