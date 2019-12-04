
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DecisionOfTheDirectorOfTheCommission } from 'app/shared/models/decision-of-the-director-of-the-commission';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DecisionOfTheDirectorOfTheCommissionEditComponent } from '../decision-of-the-director-of-the-commission-edit/decision-of-the-director-of-the-commission-edit.component';
import { DecisionOfTheDirectorOfTheCommissionNewComponent } from '../decision-of-the-director-of-the-commission-new/decision-of-the-director-of-the-commission-new.component';
import { DecisionOfTheDirectorOfTheCommissionViewComponent } from '../decision-of-the-director-of-the-commission-view/decision-of-the-director-of-the-commission-view.component';
import { DecisionOfTheDirectorOfTheCommissionService } from '../shared/decision-of-the-director-of-the-commission.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-decision-of-the-director-of-the-commission-list',
  templateUrl: './decision-of-the-director-of-the-commission-list.component.html',
  styleUrls: ['./decision-of-the-director-of-the-commission-list.component.scss'],
  providers: []
})

export class DecisionOfTheDirectorOfTheCommissionListComponent extends AppBaseComponent implements OnInit {
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

  
  @Input() selectedDecisionOfTheDirectorOfTheCommission: DecisionOfTheDirectorOfTheCommission;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المبنى', field: 'buildingCode' }),
	new GridColumnOptions({ headerName: 'عنوان المدرسة', field: 'schoolAddress' }),
	new GridColumnOptions({ headerName: 'تاريخ المعاينة', field: 'previewDate' }),
	new GridColumnOptions({ headerName: 'ت. بداية', field: 'startDate' }),
	new GridColumnOptions({ headerName: 'ت.النهاية', field: 'endDate' }),
	new GridColumnOptions({ headerName: 'النص', field: 'text' }),
	new GridColumnOptions({ headerName: 'القسم/المركز', field: 'sectionCenter' }),
	new GridColumnOptions({ headerName: 'القرية/الشياخة', field: 'village' }),
	new GridColumnOptions({ headerName: 'الادارة التعليمية', field: 'educationalAdministration' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DecisionOfTheDirectorOfTheCommissionViewComponent,
    editDialogClassType: DecisionOfTheDirectorOfTheCommissionEditComponent,
    newDialogClassType: DecisionOfTheDirectorOfTheCommissionNewComponent,
  });
    constructor(
        injector: Injector,
        public decisionOfTheDirectorOfTheCommissionService: DecisionOfTheDirectorOfTheCommissionService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDecisionOfTheDirectorOfTheCommission = new DecisionOfTheDirectorOfTheCommission();

    
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
	text : [],
	sectionCenter : [],
	village : [],
	educationalAdministration : []
    });

     
  }

  getDecisionOfTheDirectorOfTheCommissionsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DecisionOfTheDirectorOfTheCommission[]> => {
    return this.decisionOfTheDirectorOfTheCommissionService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.decisionOfTheDirectorOfTheCommissionService.delete(param.data.id)
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

