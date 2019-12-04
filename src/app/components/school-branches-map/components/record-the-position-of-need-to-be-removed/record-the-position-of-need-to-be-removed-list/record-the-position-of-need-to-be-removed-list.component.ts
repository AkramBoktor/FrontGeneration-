
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordThePositionOfNeedToBeRemoved } from 'app/shared/models/record-the-position-of-need-to-be-removed';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordThePositionOfNeedToBeRemovedEditComponent } from '../record-the-position-of-need-to-be-removed-edit/record-the-position-of-need-to-be-removed-edit.component';
import { RecordThePositionOfNeedToBeRemovedNewComponent } from '../record-the-position-of-need-to-be-removed-new/record-the-position-of-need-to-be-removed-new.component';
import { RecordThePositionOfNeedToBeRemovedViewComponent } from '../record-the-position-of-need-to-be-removed-view/record-the-position-of-need-to-be-removed-view.component';
import { RecordThePositionOfNeedToBeRemovedService } from '../shared/record-the-position-of-need-to-be-removed.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-position-of-need-to-be-removed-list',
  templateUrl: './record-the-position-of-need-to-be-removed-list.component.html',
  styleUrls: ['./record-the-position-of-need-to-be-removed-list.component.scss'],
  providers: []
})

export class RecordThePositionOfNeedToBeRemovedListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private educationalNeedAttitudesService: LookupService;
private positionAreaNeedsService: LookupService;

  
statusSelectOptions: MaterialSelectOptions;
needCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('status', { static: true }) StatusSelectComponent: MaterialSelectComponent;
	@ViewChild('needCode', { static: true }) NeedCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordThePositionOfNeedToBeRemoved: RecordThePositionOfNeedToBeRemoved;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المدرسة', field: 'schoolCode' }),
	new GridColumnOptions({ headerName: 'الملحق', field: 'extension' }),
	new GridColumnOptions({ headerName: 'الموقف', field: 'status' }),
	new GridColumnOptions({ headerName: 'كود الاحتياج', field: 'needCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordThePositionOfNeedToBeRemovedViewComponent,
    editDialogClassType: RecordThePositionOfNeedToBeRemovedEditComponent,
    newDialogClassType: RecordThePositionOfNeedToBeRemovedNewComponent,
  });
    constructor(
        injector: Injector,
        public recordThePositionOfNeedToBeRemovedService: RecordThePositionOfNeedToBeRemovedService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordThePositionOfNeedToBeRemoved = new RecordThePositionOfNeedToBeRemoved();

    
	this.statusSelectOptions = new MaterialSelectOptions({
	 data: this.educationalNeedAttitudesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الموقف',
	});

	this.needCodeSelectOptions = new MaterialSelectOptions({
	 data: this.positionAreaNeedsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاحتياج',
	});


    this.searchForm = this.formBuilder.group({
     	schoolCode : [],
	extension : [],
	status : [],
	needCode : []
    });

     
  }

  getRecordThePositionOfNeedToBeRemovedPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordThePositionOfNeedToBeRemoved[]> => {
    return this.recordThePositionOfNeedToBeRemovedService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordThePositionOfNeedToBeRemovedService.delete(param.data.id)
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
    this.educationalNeedAttitudesService = new LookupService('educationalneedattitudes', this.http);
this.positionAreaNeedsService = new LookupService('positionareaneeds', this.http);
  }
}

