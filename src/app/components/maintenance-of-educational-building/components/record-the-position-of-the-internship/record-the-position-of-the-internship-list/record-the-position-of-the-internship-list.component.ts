
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordThePositionOfTheInternship } from 'app/shared/models/record-the-position-of-the-internship';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordThePositionOfTheInternshipEditComponent } from '../record-the-position-of-the-internship-edit/record-the-position-of-the-internship-edit.component';
import { RecordThePositionOfTheInternshipNewComponent } from '../record-the-position-of-the-internship-new/record-the-position-of-the-internship-new.component';
import { RecordThePositionOfTheInternshipViewComponent } from '../record-the-position-of-the-internship-view/record-the-position-of-the-internship-view.component';
import { RecordThePositionOfTheInternshipService } from '../shared/record-the-position-of-the-internship.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-position-of-the-internship-list',
  templateUrl: './record-the-position-of-the-internship-list.component.html',
  styleUrls: ['./record-the-position-of-the-internship-list.component.scss'],
  providers: []
})

export class RecordThePositionOfTheInternshipListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private subDepartmentsService: LookupService;

  
administrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationCode', { static: true }) AdministrationCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordThePositionOfTheInternship: RecordThePositionOfTheInternship;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' التاريخ', field: 'date' }),
	new GridColumnOptions({ headerName: ' رقم التدريب', field: 'trainingNumber' }),
	new GridColumnOptions({ headerName: ' موضوع التدريب', field: 'trainingTopic' }),
	new GridColumnOptions({ headerName: 'كود الاداره', field: 'administrationCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordThePositionOfTheInternshipViewComponent,
    editDialogClassType: RecordThePositionOfTheInternshipEditComponent,
    newDialogClassType: RecordThePositionOfTheInternshipNewComponent,
  });
    constructor(
        injector: Injector,
        public recordThePositionOfTheInternshipService: RecordThePositionOfTheInternshipService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordThePositionOfTheInternship = new RecordThePositionOfTheInternship();

    
	this.administrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الاداره',
	});


    this.searchForm = this.formBuilder.group({
     	date : [],
	trainingNumber : [],
	trainingTopic : [],
	administrationCode : []
    });

     
  }

  getRecordThePositionOfTheInternshipPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordThePositionOfTheInternship[]> => {
    return this.recordThePositionOfTheInternshipService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordThePositionOfTheInternshipService.delete(param.data.id)
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
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

