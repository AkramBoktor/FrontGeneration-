
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordTheInspectionDateInTheTechnicalReport } from 'app/shared/models/record-the-inspection-date-in-the-technical-report';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordTheInspectionDateInTheTechnicalReportEditComponent } from '../record-the-inspection-date-in-the-technical-report-edit/record-the-inspection-date-in-the-technical-report-edit.component';
import { RecordTheInspectionDateInTheTechnicalReportNewComponent } from '../record-the-inspection-date-in-the-technical-report-new/record-the-inspection-date-in-the-technical-report-new.component';
import { RecordTheInspectionDateInTheTechnicalReportViewComponent } from '../record-the-inspection-date-in-the-technical-report-view/record-the-inspection-date-in-the-technical-report-view.component';
import { RecordTheInspectionDateInTheTechnicalReportService } from '../shared/record-the-inspection-date-in-the-technical-report.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-inspection-date-in-the-technical-report-list',
  templateUrl: './record-the-inspection-date-in-the-technical-report-list.component.html',
  styleUrls: ['./record-the-inspection-date-in-the-technical-report-list.component.scss'],
  providers: []
})

export class RecordTheInspectionDateInTheTechnicalReportListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRecordTheInspectionDateInTheTechnicalReport: RecordTheInspectionDateInTheTechnicalReport;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عنوان المدرسة', field: 'schoolAddress' }),
	new GridColumnOptions({ headerName: 'تاريخ المعاينة', field: 'previewDate' }),
	new GridColumnOptions({ headerName: 'ت. بداية', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'ت.النهاية', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'القسم/المركز', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'القرية/الشياخة', field: 'village' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RecordTheInspectionDateInTheTechnicalReportViewComponent,
    editDialogClassType: RecordTheInspectionDateInTheTechnicalReportEditComponent,
    newDialogClassType: RecordTheInspectionDateInTheTechnicalReportNewComponent,
  });
    constructor(
        injector: Injector,
        public recordTheInspectionDateInTheTechnicalReportService: RecordTheInspectionDateInTheTechnicalReportService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRecordTheInspectionDateInTheTechnicalReport = new RecordTheInspectionDateInTheTechnicalReport();

    
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


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	schoolAddress : [],
	previewDate : [],
	startDate : [],
	endDate : [],
	sectionCenter : [],
	village : [],
	educationalAdministration : []
    });

     
  }

  getRecordTheInspectionDateInTheTechnicalReportsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RecordTheInspectionDateInTheTechnicalReport[]> => {
    return this.recordTheInspectionDateInTheTechnicalReportService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.recordTheInspectionDateInTheTechnicalReportService.delete(param.data.id)
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
  }
}

