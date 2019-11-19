
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { CareerPrograms } from 'app/shared/models/career-programs';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CareerProgramsEditComponent } from '../career-programs-edit/career-programs-edit.component';
import { CareerProgramsNewComponent } from '../career-programs-new/career-programs-new.component';
import { CareerProgramsViewComponent } from '../career-programs-view/career-programs-view.component';
import { CareerProgramsService } from '../shared/career-programs.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-career-programs-list',
  templateUrl: './career-programs-list.component.html',
  styleUrls: ['./career-programs-list.component.scss'],
  providers: []
})

export class CareerProgramsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private areasService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedCareerPrograms: CareerPrograms;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الوظيفه', field: 'jobCode' }),
	new GridColumnOptions({ headerName: 'اسم الوظيفه', field: 'jobName' }),
	new GridColumnOptions({ headerName: 'العدد المقرر', field: 'scheduledNumber' }),
	new GridColumnOptions({ headerName: 'المنطقه', field: 'region' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: CareerProgramsViewComponent,
    editDialogClassType: CareerProgramsEditComponent,
    newDialogClassType: CareerProgramsNewComponent,
  });
    constructor(
        injector: Injector,
        public careerProgramsService: CareerProgramsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedCareerPrograms = new CareerPrograms();

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});


    this.searchForm = this.formBuilder.group({
     	jobCode : [],
	jobName : [],
	region : []
    });

     
  }

  getCareerProgramPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<CareerPrograms[]> => {
    return this.careerProgramsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.careerProgramsService.delete(param.data.id)
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
    this.areasService = new LookupService('areas', this.http);
  }
}

