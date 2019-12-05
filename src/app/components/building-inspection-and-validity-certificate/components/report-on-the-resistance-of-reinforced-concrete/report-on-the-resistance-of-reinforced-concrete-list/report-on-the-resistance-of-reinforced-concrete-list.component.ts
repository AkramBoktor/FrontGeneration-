
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ReportOnTheResistanceOfReinforcedConcrete } from 'app/shared/models/report-on-the-resistance-of-reinforced-concrete';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ReportOnTheResistanceOfReinforcedConcreteEditComponent } from '../report-on-the-resistance-of-reinforced-concrete-edit/report-on-the-resistance-of-reinforced-concrete-edit.component';
import { ReportOnTheResistanceOfReinforcedConcreteNewComponent } from '../report-on-the-resistance-of-reinforced-concrete-new/report-on-the-resistance-of-reinforced-concrete-new.component';
import { ReportOnTheResistanceOfReinforcedConcreteViewComponent } from '../report-on-the-resistance-of-reinforced-concrete-view/report-on-the-resistance-of-reinforced-concrete-view.component';
import { ReportOnTheResistanceOfReinforcedConcreteService } from '../shared/report-on-the-resistance-of-reinforced-concrete.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-report-on-the-resistance-of-reinforced-concrete-list',
  templateUrl: './report-on-the-resistance-of-reinforced-concrete-list.component.html',
  styleUrls: ['./report-on-the-resistance-of-reinforced-concrete-list.component.scss'],
  providers: []
})

export class ReportOnTheResistanceOfReinforcedConcreteListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private elementsService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
structuralComponentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('structuralComponent', { static: true }) StructuralComponentSelectComponent: MaterialSelectComponent;

  
  @Input() selectedReportOnTheResistanceOfReinforcedConcrete: ReportOnTheResistanceOfReinforcedConcrete;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عنوان المدرسة', field: 'schoolAddress' }),
	new GridColumnOptions({ headerName: 'تاريخ المعاينة', field: 'previewDate' }),
	new GridColumnOptions({ headerName: 'ت. بداية', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'ت.النهاية', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'extensionNumber' }),
	new GridColumnOptions({ headerName: 'رقم العينة', field: 'sampleNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ اجراء الاختبار', field: 'testDate' }),
	new GridColumnOptions({ headerName: 'القسم/المركز', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'القرية/الشياخة', field: 'village' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
	new GridColumnOptions({ headerName: 'العنصر الإنشائي', field: 'structuralComponent' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ReportOnTheResistanceOfReinforcedConcreteViewComponent,
    editDialogClassType: ReportOnTheResistanceOfReinforcedConcreteEditComponent,
    newDialogClassType: ReportOnTheResistanceOfReinforcedConcreteNewComponent,
  });
    constructor(
        injector: Injector,
        public reportOnTheResistanceOfReinforcedConcreteService: ReportOnTheResistanceOfReinforcedConcreteService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedReportOnTheResistanceOfReinforcedConcrete = new ReportOnTheResistanceOfReinforcedConcrete();

    
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

	this.structuralComponentSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العنصر الإنشائي',
	});


    this.searchForm = this.formBuilder.group({
     	buildingCode : [],
	schoolAddress : [],
	previewDate : [],
	startDate : [],
	endDate : [],
	extensionNumber : [],
	sampleNumber : [],
	testDate : [],
	sectionCenter : [],
	village : [],
	educationalAdministration : [],
	structuralComponent : []
    });

     
  }

  getReportOnTheResistanceOfReinforcedConcretePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ReportOnTheResistanceOfReinforcedConcrete[]> => {
    return this.reportOnTheResistanceOfReinforcedConcreteService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.reportOnTheResistanceOfReinforcedConcreteService.delete(param.data.id)
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
this.elementsService = new LookupService('elements', this.http);
  }
}

