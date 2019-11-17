
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Occasion } from 'app/shared/models/occasion';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccasionEditComponent } from '../occasion-edit/occasion-edit.component';
import { OccasionNewComponent } from '../occasion-new/occasion-new.component';
import { OccasionViewComponent } from '../occasion-view/occasion-view.component';
import { OccasionService } from '../shared/occasion.service';

@Component({
  selector: 'app-occasion-list',
  templateUrl: './occasion-list.component.html',
  styleUrls: ['./occasion-list.component.scss'],
  providers: []
})

export class OccasionListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private eventCodesService: LookupService;
private mamoriyaSidesService: LookupService;

  
eventTypeSelectOptions: MaterialSelectOptions;
missionIssuerSelectOptions: MaterialSelectOptions;

  
	@ViewChild('eventType', { static: true }) EventTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('missionIssuer', { static: true }) MissionIssuerSelectComponent: MaterialSelectComponent;

  
  @Input() selectedOccasion: Occasion;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'تاريخ البدايه', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'وقت البدايه', field: 'startTime' }),
	new GridColumnOptions({ headerName: 'تاريخ النهايه', field: 'expiryDate' }),
	new GridColumnOptions({ headerName: 'وقت النهايه', field: 'endTime' }),
	new GridColumnOptions({ headerName: 'نوع الحدث', field: 'eventType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: OccasionViewComponent,
    editDialogClassType: OccasionEditComponent,
    newDialogClassType: OccasionNewComponent,
  });
    constructor(
        injector: Injector,
        public occasionService: OccasionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedOccasion = new Occasion();

    
	this.eventTypeSelectOptions = new MaterialSelectOptions({
	 data: this.eventCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الحدث',
	});

	this.missionIssuerSelectOptions = new MaterialSelectOptions({
	 data: this.mamoriyaSidesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهة المأمورية',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	startDate : [],
	eventType : [],
	missionIssuer : []
    });

     
  }

  getOccasionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<Occasion[]> => {
    return this.occasionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.occasionService.delete(param.data.id)
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
    this.eventCodesService = new LookupService('eventcodes', this.http);
this.mamoriyaSidesService = new LookupService('mamoriyasides', this.http);
  }
}

