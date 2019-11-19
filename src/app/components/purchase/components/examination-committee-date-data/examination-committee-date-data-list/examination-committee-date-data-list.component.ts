
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExaminationCommitteeDateData } from 'app/shared/models/examination-committee-date-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExaminationCommitteeDateDataEditComponent } from '../examination-committee-date-data-edit/examination-committee-date-data-edit.component';
import { ExaminationCommitteeDateDataNewComponent } from '../examination-committee-date-data-new/examination-committee-date-data-new.component';
import { ExaminationCommitteeDateDataViewComponent } from '../examination-committee-date-data-view/examination-committee-date-data-view.component';
import { ExaminationCommitteeDateDataService } from '../shared/examination-committee-date-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-examination-committee-date-data-list',
  templateUrl: './examination-committee-date-data-list.component.html',
  styleUrls: ['./examination-committee-date-data-list.component.scss'],
  providers: []
})

export class ExaminationCommitteeDateDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedExaminationCommitteeDateData: ExaminationCommitteeDateData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم مناقصة', field: 'bidNumber' }),
	new GridColumnOptions({ headerName: 'رقم الاجتماع', field: 'meetingNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ انعقاد لجنة البت', field: 'committeeDate' }),
	new GridColumnOptions({ headerName: 'مقر انعقاد لجنة البت', field: 'committeeHeadquarters' }),
	new GridColumnOptions({ headerName: 'تاريخ الموافقة على التشكيل', field: 'approvalFormationDate' }),
	new GridColumnOptions({ headerName: 'اجراءات الطرح', field: 'offeringProcedures' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExaminationCommitteeDateDataViewComponent,
    editDialogClassType: ExaminationCommitteeDateDataEditComponent,
    newDialogClassType: ExaminationCommitteeDateDataNewComponent,
  });
    constructor(
        injector: Injector,
        public examinationCommitteeDateDataService: ExaminationCommitteeDateDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExaminationCommitteeDateData = new ExaminationCommitteeDateData();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	meetingNumber : [],
	committeeDate : [],
	committeeHeadquarters : [],
	approvalFormationDate : [],
	offeringProcedures : [],
	offeringType : []
    });

     
  }

  getExaminationCommitteeDateDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExaminationCommitteeDateData[]> => {
    return this.examinationCommitteeDateDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.examinationCommitteeDateDataService.delete(param.data.id)
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

