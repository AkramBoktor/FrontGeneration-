
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TechnicalOpinionOfConsultant } from 'app/shared/models/technical-opinion-of-consultant';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TechnicalOpinionOfConsultantEditComponent } from '../technical-opinion-of-consultant-edit/technical-opinion-of-consultant-edit.component';
import { TechnicalOpinionOfConsultantNewComponent } from '../technical-opinion-of-consultant-new/technical-opinion-of-consultant-new.component';
import { TechnicalOpinionOfConsultantViewComponent } from '../technical-opinion-of-consultant-view/technical-opinion-of-consultant-view.component';
import { TechnicalOpinionOfConsultantService } from '../shared/technical-opinion-of-consultant.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-technical-opinion-of-consultant-list',
  templateUrl: './technical-opinion-of-consultant-list.component.html',
  styleUrls: ['./technical-opinion-of-consultant-list.component.scss'],
  providers: []
})

export class TechnicalOpinionOfConsultantListComponent extends AppBaseComponent implements OnInit {
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

  
  @Input() selectedTechnicalOpinionOfConsultant: TechnicalOpinionOfConsultant;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عنوان المدرسة', field: 'schoolAddress' }),
	new GridColumnOptions({ headerName: 'تاريخ المعاينة', field: 'previewDate' }),
	new GridColumnOptions({ headerName: 'ت. بداية', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'ت.النهاية', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'نوع البيان', field: 'statementType' }),
	new GridColumnOptions({ headerName: 'النص', field: 'text' }),
	new GridColumnOptions({ headerName: 'القسم/المركز', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'القرية/الشياخة', field: 'village' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TechnicalOpinionOfConsultantViewComponent,
    editDialogClassType: TechnicalOpinionOfConsultantEditComponent,
    newDialogClassType: TechnicalOpinionOfConsultantNewComponent,
  });
    constructor(
        injector: Injector,
        public technicalOpinionOfConsultantService: TechnicalOpinionOfConsultantService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTechnicalOpinionOfConsultant = new TechnicalOpinionOfConsultant();

    
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
	statementType : [],
	text : [],
	sectionCenter : [],
	village : [],
	educationalAdministration : []
    });

     
  }

  getTechnicalOpinionOfConsultantsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TechnicalOpinionOfConsultant[]> => {
    return this.technicalOpinionOfConsultantService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.technicalOpinionOfConsultantService.delete(param.data.id)
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

