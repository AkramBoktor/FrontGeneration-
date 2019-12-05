
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DataWithdrawalNote } from 'app/shared/models/data-withdrawal-note';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataWithdrawalNoteEditComponent } from '../data-withdrawal-note-edit/data-withdrawal-note-edit.component';
import { DataWithdrawalNoteNewComponent } from '../data-withdrawal-note-new/data-withdrawal-note-new.component';
import { DataWithdrawalNoteViewComponent } from '../data-withdrawal-note-view/data-withdrawal-note-view.component';
import { DataWithdrawalNoteService } from '../shared/data-withdrawal-note.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-withdrawal-note-list',
  templateUrl: './data-withdrawal-note-list.component.html',
  styleUrls: ['./data-withdrawal-note-list.component.scss'],
  providers: []
})

export class DataWithdrawalNoteListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private offeringTypesService: LookupService;
private constructionTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedDataWithdrawalNote: DataWithdrawalNote;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الطرح', field: 'offeringNumber' }),
	new GridColumnOptions({ headerName: 'اسم الطرح', field: 'offeringName' }),
	new GridColumnOptions({ headerName: 'رقم المبني', field: 'buildingNumber' }),
	new GridColumnOptions({ headerName: 'كود المقاول', field: 'contractorCode' }),
	new GridColumnOptions({ headerName: 'رقم المذكره', field: 'noteNumber' }),
	new GridColumnOptions({ headerName: 'كود النشاط', field: 'activityCode' }),
	new GridColumnOptions({ headerName: 'تاريخ التوقف', field: 'stopDate' }),
	new GridColumnOptions({ headerName: 'نوع الطرح', field: 'offeringType' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DataWithdrawalNoteViewComponent,
    editDialogClassType: DataWithdrawalNoteEditComponent,
    newDialogClassType: DataWithdrawalNoteNewComponent,
  });
    constructor(
        injector: Injector,
        public dataWithdrawalNoteService: DataWithdrawalNoteService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDataWithdrawalNote = new DataWithdrawalNote();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.searchForm = this.formBuilder.group({
     	offeringNumber : [],
	offeringName : [],
	buildingNumber : [],
	contractorCode : [],
	noteNumber : [],
	activityCode : [],
	stopDate : [],
	offeringType : [],
	constructionType : []
    });

     
  }

  getDataWithdrawalNotePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DataWithdrawalNote[]> => {
    return this.dataWithdrawalNoteService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.dataWithdrawalNoteService.delete(param.data.id)
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
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}

