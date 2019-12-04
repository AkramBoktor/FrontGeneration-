
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { IntroducingExceptionForBranchesEngineer } from 'app/shared/models/introducing-exception-for-branches-engineer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IntroducingExceptionForBranchesEngineerEditComponent } from '../introducing-exception-for-branches-engineer-edit/introducing-exception-for-branches-engineer-edit.component';
import { IntroducingExceptionForBranchesEngineerNewComponent } from '../introducing-exception-for-branches-engineer-new/introducing-exception-for-branches-engineer-new.component';
import { IntroducingExceptionForBranchesEngineerViewComponent } from '../introducing-exception-for-branches-engineer-view/introducing-exception-for-branches-engineer-view.component';
import { IntroducingExceptionForBranchesEngineerService } from '../shared/introducing-exception-for-branches-engineer.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-introducing-exception-for-branches-engineer-list',
  templateUrl: './introducing-exception-for-branches-engineer-list.component.html',
  styleUrls: ['./introducing-exception-for-branches-engineer-list.component.scss'],
  providers: []
})

export class IntroducingExceptionForBranchesEngineerListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedIntroducingExceptionForBranchesEngineer: IntroducingExceptionForBranchesEngineer;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المهندس التنفيذى', field: 'executiveEngineerNumber' }),
	new GridColumnOptions({ headerName: 'رقم المدرسه', field: 'schoolNumber' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'attachedNumber' }),
	new GridColumnOptions({ headerName: 'سنه الخطه', field: 'yearPlan' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بدايه الاشراف', field: 'supervisionBeginningDate' }),
	new GridColumnOptions({ headerName: 'النوع', field: 'type' }),
	new GridColumnOptions({ headerName: 'رقم الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: IntroducingExceptionForBranchesEngineerViewComponent,
    editDialogClassType: IntroducingExceptionForBranchesEngineerEditComponent,
    newDialogClassType: IntroducingExceptionForBranchesEngineerNewComponent,
  });
    constructor(
        injector: Injector,
        public introducingExceptionForBranchesEngineerService: IntroducingExceptionForBranchesEngineerService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedIntroducingExceptionForBranchesEngineer = new IntroducingExceptionForBranchesEngineer();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	executiveEngineerNumber : [],
	schoolNumber : [],
	attachedNumber : [],
	yearPlan : [],
	bidNumber : [],
	supervisionBeginningDate : [],
	type : [],
	branchCode : [],
	constructionType : [],
	offeringType : []
    });

     
  }

  getIntroducingExceptionForBranchesEngineerPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<IntroducingExceptionForBranchesEngineer[]> => {
    return this.introducingExceptionForBranchesEngineerService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.introducingExceptionForBranchesEngineerService.delete(param.data.id)
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
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

