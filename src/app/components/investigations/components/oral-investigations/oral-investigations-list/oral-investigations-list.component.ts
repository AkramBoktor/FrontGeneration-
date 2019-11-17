
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { OralInvestigations } from 'app/shared/models/oral-investigations';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OralInvestigationsEditComponent } from '../oral-investigations-edit/oral-investigations-edit.component';
import { OralInvestigationsNewComponent } from '../oral-investigations-new/oral-investigations-new.component';
import { OralInvestigationsViewComponent } from '../oral-investigations-view/oral-investigations-view.component';
import { OralInvestigationsService } from '../shared/oral-investigations.service';

@Component({
  selector: 'app-oral-investigations-list',
  templateUrl: './oral-investigations-list.component.html',
  styleUrls: ['./oral-investigations-list.component.scss'],
  providers: []
})

export class OralInvestigationsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private branchCodesService: LookupService;
private violationsService: LookupService;
private penaltiesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
violationCodeSelectOptions: MaterialSelectOptions;
punishmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('violationCode', { static: true }) ViolationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('punishment', { static: true }) PunishmentSelectComponent: MaterialSelectComponent;

  
  @Input() selectedOralInvestigations: OralInvestigations;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم ملف التحقيق', field: 'investigationFileNumber' }),
	new GridColumnOptions({ headerName: 'رقم موقع العقوبة (المحامي)', field: 'lawyerPenaltyCode' }),
	new GridColumnOptions({ headerName: 'تاريخ توقيع العقوبة', field: 'punishmentDate' }),
	new GridColumnOptions({ headerName: 'رقم الامر التنفيذي', field: 'executiveOrderNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ صدور الامر التنفيذي', field: 'issuanceExecutiveOrderDate' }),
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'اسم الموظف', field: 'employeeName' }),
	new GridColumnOptions({ headerName: 'كود الفرع', field: 'branchCode' }),
	new GridColumnOptions({ headerName: 'كود المخالفة', field: 'violationCode' }),
	new GridColumnOptions({ headerName: 'العقوبة', field: 'punishment' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: OralInvestigationsViewComponent,
    editDialogClassType: OralInvestigationsEditComponent,
    newDialogClassType: OralInvestigationsNewComponent,
  });
    constructor(
        injector: Injector,
        public oralInvestigationsService: OralInvestigationsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedOralInvestigations = new OralInvestigations();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.violationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.violationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المخالفة',
	});

	this.punishmentSelectOptions = new MaterialSelectOptions({
	 data: this.penaltiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العقوبة',
	});


    this.searchForm = this.formBuilder.group({
     	investigationFileNumber : [],
	lawyerPenaltyCode : [],
	punishmentDate : [],
	executiveOrderNumber : [],
	issuanceExecutiveOrderDate : [],
	employeeCode : [],
	employeeName : [],
	branchCode : [],
	violationCode : [],
	punishment : []
    });

     
  }

  getOralInvestigationsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<OralInvestigations[]> => {
    return this.oralInvestigationsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.oralInvestigationsService.delete(param.data.id)
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
this.violationsService = new LookupService('violations', this.http);
this.penaltiesService = new LookupService('penalties', this.http);
  }
}

