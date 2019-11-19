
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorDurations } from 'app/shared/models/contractor-durations';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ContractorDurationsEditComponent } from '../contractor-durations-edit/contractor-durations-edit.component';
import { ContractorDurationsNewComponent } from '../contractor-durations-new/contractor-durations-new.component';
import { ContractorDurationsViewComponent } from '../contractor-durations-view/contractor-durations-view.component';
import { ContractorDurationsService } from '../shared/contractor-durations.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractor-durations-list',
  templateUrl: './contractor-durations-list.component.html',
  styleUrls: ['./contractor-durations-list.component.scss'],
  providers: []
})

export class ContractorDurationsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private contractorTideReasonsService: LookupService;

  
reasonCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('reasonCode', { static: true }) ReasonCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedContractorDurations: ContractorDurations;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المبني', field: 'buildingNumber' }),
	new GridColumnOptions({ headerName: 'الفتره من', field: 'periodFrom' }),
	new GridColumnOptions({ headerName: 'الفتره الي', field: 'periodTo' }),
	new GridColumnOptions({ headerName: 'الملحق', field: 'extension' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'كود المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'اسم المقاول', field: 'contractorName' }),
	new GridColumnOptions({ headerName: 'اسم المهندس', field: 'engineerName' }),
	new GridColumnOptions({ headerName: 'مده التنفيذ', field: 'executionDuration' }),
	new GridColumnOptions({ headerName: 'اسم المراجع', field: 'referencesName' }),
	new GridColumnOptions({ headerName: 'كود المهندس المشرف', field: 'supervisorEngineerCode' }),
	new GridColumnOptions({ headerName: 'تاريخ تسليم الموقع', field: 'siteDeliveryDate' }),
	new GridColumnOptions({ headerName: 'كود المراجع', field: 'referenceCode' }),
	new GridColumnOptions({ headerName: 'اسم المحافظه', field: 'governorateName' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'كود السبب', field: 'reasonCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ContractorDurationsViewComponent,
    editDialogClassType: ContractorDurationsEditComponent,
    newDialogClassType: ContractorDurationsNewComponent,
  });
    constructor(
        injector: Injector,
        public contractorDurationsService: ContractorDurationsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedContractorDurations = new ContractorDurations();

    
	this.reasonCodeSelectOptions = new MaterialSelectOptions({
	 data: this.contractorTideReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السبب',
	});


    this.searchForm = this.formBuilder.group({
     	buildingNumber : [],
	bidNumber : [],
	contractorCode : [],
	supervisorEngineerCode : [],
	referenceCode : [],
	reasonCode : []
    });

     
  }

  getContractorDurationsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ContractorDurations[]> => {
    return this.contractorDurationsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.contractorDurationsService.delete(param.data.id)
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
    this.contractorTideReasonsService = new LookupService('contractortidereasons', this.http);
  }
}

