
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ObstaclesAndMeasuresTaken } from 'app/shared/models/obstacles-and-measures-taken';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ObstaclesAndMeasuresTakenEditComponent } from '../obstacles-and-measures-taken-edit/obstacles-and-measures-taken-edit.component';
import { ObstaclesAndMeasuresTakenNewComponent } from '../obstacles-and-measures-taken-new/obstacles-and-measures-taken-new.component';
import { ObstaclesAndMeasuresTakenViewComponent } from '../obstacles-and-measures-taken-view/obstacles-and-measures-taken-view.component';
import { ObstaclesAndMeasuresTakenService } from '../shared/obstacles-and-measures-taken.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-obstacles-and-measures-taken-list',
  templateUrl: './obstacles-and-measures-taken-list.component.html',
  styleUrls: ['./obstacles-and-measures-taken-list.component.scss'],
  providers: []
})

export class ObstaclesAndMeasuresTakenListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;
private supportTypesService: LookupService;
private implementationPositionsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
referenceCodeSelectOptions: MaterialSelectOptions;
executionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('referenceCode', { static: true }) ReferenceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('executionCode', { static: true }) ExecutionCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedObstaclesAndMeasuresTaken: ObstaclesAndMeasuresTaken;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الرقم التعريفي', field: 'iDNumber' }),
	new GridColumnOptions({ headerName: 'كود المراجع', field: 'referencesCode' }),
	new GridColumnOptions({ headerName: 'المعوقات', field: 'difficulties' }),
	new GridColumnOptions({ headerName: 'الاجرأت', field: 'procedures' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'رقم المناقصه', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم المقال', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: ' كود الاسناد', field: 'referenceCode' }),
	new GridColumnOptions({ headerName: 'كود التنفيذ', field: 'executionCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ObstaclesAndMeasuresTakenViewComponent,
    editDialogClassType: ObstaclesAndMeasuresTakenEditComponent,
    newDialogClassType: ObstaclesAndMeasuresTakenNewComponent,
  });
    constructor(
        injector: Injector,
        public obstaclesAndMeasuresTakenService: ObstaclesAndMeasuresTakenService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedObstaclesAndMeasuresTaken = new ObstaclesAndMeasuresTaken();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.referenceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.supportTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الاسناد',
	});

	this.executionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.implementationPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التنفيذ',
	});


    this.searchForm = this.formBuilder.group({
     	iDNumber : [],
	referencesCode : [],
	contractorCode : [],
	governorate : [],
	referenceCode : [],
	executionCode : []
    });

     
  }

  getObstaclesAndMeasuresTakenPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ObstaclesAndMeasuresTaken[]> => {
    return this.obstaclesAndMeasuresTakenService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.obstaclesAndMeasuresTakenService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
this.supportTypesService = new LookupService('supporttypes', this.http);
this.implementationPositionsService = new LookupService('implementationpositions', this.http);
  }
}

