
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TrainingDestination } from 'app/shared/models/training-destination';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TrainingDestinationService } from '../shared/training-destination.service';
import { TrainingDestinationEditComponent } from '../training-destination-edit/training-destination-edit.component';
import { TrainingDestinationNewComponent } from '../training-destination-new/training-destination-new.component';
import { TrainingDestinationViewComponent } from '../training-destination-view/training-destination-view.component';

@Component({
  selector: 'app-training-destination-list',
  templateUrl: './training-destination-list.component.html',
  styleUrls: ['./training-destination-list.component.scss'],
  providers: []
})

export class TrainingDestinationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private entityTypeService: LookupService;
private majorClassificationsService: LookupService;

  
destinationTypeSelectOptions: MaterialSelectOptions;
institutionDestinationSpecializationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('destinationType', { static: true }) DestinationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('institutionDestinationSpecialization', { static: true }) InstitutionDestinationSpecializationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTrainingDestination: TrainingDestination;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الاسم', field: 'name' }),
	new GridColumnOptions({ headerName: 'العنوان', field: 'titleAddress' }),
	new GridColumnOptions({ headerName: 'الفاكس', field: 'fax' }),
	new GridColumnOptions({ headerName: 'اسم المدير المسئول', field: 'responsibleManagerName' }),
	new GridColumnOptions({ headerName: 'كود الجهه', field: 'destinationCode' }),
	new GridColumnOptions({ headerName: 'نوع الجهه', field: 'destinationType' }),
	new GridColumnOptions({ headerName: 'تخصص الجهه', field: 'institutionDestinationSpecialization' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TrainingDestinationViewComponent,
    editDialogClassType: TrainingDestinationEditComponent,
    newDialogClassType: TrainingDestinationNewComponent,
  });
    constructor(
        injector: Injector,
        public trainingDestinationService: TrainingDestinationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTrainingDestination = new TrainingDestination();

    
	this.destinationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهه',
	});

	this.institutionDestinationSpecializationSelectOptions = new MaterialSelectOptions({
	 data: this.majorClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تخصص الجهه',
	});


    this.searchForm = this.formBuilder.group({
     	destinationCode : [],
	name : [],
	titleAddress : [],
	phoneNumber : [],
	fax : [],
	responsibleManagerName : [],
	destinationType : [],
	institutionDestinationSpecialization : []
    });

     
  }

  getTrainingDestinationsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TrainingDestination[]> => {
    return this.trainingDestinationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.trainingDestinationService.delete(param.data.id)
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
    this.entityTypeService = new LookupService('entitytypes', this.http);
this.majorClassificationsService = new LookupService('majorclassifications', this.http);
  }
}

