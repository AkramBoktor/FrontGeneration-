
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordTheExpectationsOfTheInspectors } from 'app/shared/models/record-the-expectations-of-the-inspectors';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordTheExpectationsOfTheInspectorsEditComponent } from '../record-the-expectations-of-the-inspectors-edit/record-the-expectations-of-the-inspectors-edit.component';
import { RecordTheExpectationsOfTheInspectorsNewComponent } from '../record-the-expectations-of-the-inspectors-new/record-the-expectations-of-the-inspectors-new.component';
import { RecordTheExpectationsOfTheInspectorsViewComponent } from '../record-the-expectations-of-the-inspectors-view/record-the-expectations-of-the-inspectors-view.component';
import { RecordTheExpectationsOfTheInspectorsService } from '../shared/record-the-expectations-of-the-inspectors.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-expectations-of-the-inspectors-list',
  templateUrl: './record-the-expectations-of-the-inspectors-list.component.html',
  styleUrls: ['./record-the-expectations-of-the-inspectors-list.component.scss'],
  providers: []
})

export class RecordTheExpectationsOfTheInspectorsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private adjectivesService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
responsibilitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('responsibility', { static: true }) ResponsibilitySelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordTheExpectationsOfTheInspectors: RecordTheExpectationsOfTheInspectors;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عنوان المدرسة', field: 'schoolAddress' }),
	new GridColumnOptions({ headerName: 'تاريخ المعاينة', field: 'previewDate' }),
	new GridColumnOptions({ headerName: 'ت. بداية', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'ت.النهاية', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'رقم المسئول', field: 'responseNumber' }),
	new GridColumnOptions({ headerName: 'اسم المسئول', field: 'responseName' }),
	new GridColumnOptions({ headerName: 'القسم/المركز', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'القرية/الشياخة', field: 'village' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
	new GridColumnOptions({ headerName: 'صفة المسئول', field: 'responsibility' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordTheExpectationsOfTheInspectorsViewComponent,
    editDialogClassType: RecordTheExpectationsOfTheInspectorsEditComponent,
    newDialogClassType: RecordTheExpectationsOfTheInspectorsNewComponent,
  });
    constructor(
        injector: Injector,
        public recordTheExpectationsOfTheInspectorsService: RecordTheExpectationsOfTheInspectorsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordTheExpectationsOfTheInspectors = new RecordTheExpectationsOfTheInspectors();

    
	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم/المركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية/الشياخة',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});

	this.responsibilitySelectOptions = new MaterialSelectOptions({
	 data: this.adjectivesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة المسئول',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	schoolAddress : [],
	previewDate : [],
	startDate : [],
	endDate : [],
	responseNumber : [],
	responseName : [],
	sectionCenter : [],
	village : [],
	educationalAdministration : [],
	responsibility : []
    });

     
  }

  getRecordTheExpectationsOfTheInspectorsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordTheExpectationsOfTheInspectors[]> => {
    return this.recordTheExpectationsOfTheInspectorsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordTheExpectationsOfTheInspectorsService.delete(param.data.id)
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
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.adjectivesService = new LookupService('adjectives', this.http);
  }
}

