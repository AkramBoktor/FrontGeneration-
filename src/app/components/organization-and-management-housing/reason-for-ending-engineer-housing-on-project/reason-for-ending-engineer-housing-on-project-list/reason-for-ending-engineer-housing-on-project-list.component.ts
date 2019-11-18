
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ReasonForEndingEngineerHousingOnProject } from 'app/shared/models/reason-for-ending-engineer-housing-on-project';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ReasonForEndingEngineerHousingOnProjectEditComponent } from '../reason-for-ending-engineer-housing-on-project-edit/reason-for-ending-engineer-housing-on-project-edit.component';
import { ReasonForEndingEngineerHousingOnProjectNewComponent } from '../reason-for-ending-engineer-housing-on-project-new/reason-for-ending-engineer-housing-on-project-new.component';
import { ReasonForEndingEngineerHousingOnProjectViewComponent } from '../reason-for-ending-engineer-housing-on-project-view/reason-for-ending-engineer-housing-on-project-view.component';
import { ReasonForEndingEngineerHousingOnProjectService } from '../shared/reason-for-ending-engineer-housing-on-project.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-reason-for-ending-engineer-housing-on-project-list',
  templateUrl: './reason-for-ending-engineer-housing-on-project-list.component.html',
  styleUrls: ['./reason-for-ending-engineer-housing-on-project-list.component.scss'],
  providers: []
})

export class ReasonForEndingEngineerHousingOnProjectListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedReasonForEndingEngineerHousingOnProject: ReasonForEndingEngineerHousingOnProject;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود سبب الانتهاء', field: 'terminateResonCode' }),
	new GridColumnOptions({ headerName: 'سبب الانهاء', field: 'terminateReson' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ReasonForEndingEngineerHousingOnProjectViewComponent,
    editDialogClassType: ReasonForEndingEngineerHousingOnProjectEditComponent,
    newDialogClassType: ReasonForEndingEngineerHousingOnProjectNewComponent,
  });
    constructor(
        injector: Injector,
        public reasonForEndingEngineerHousingOnProjectService: ReasonForEndingEngineerHousingOnProjectService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedReasonForEndingEngineerHousingOnProject = new ReasonForEndingEngineerHousingOnProject();

    

    this.searchForm = this.formBuilder.group({
     	terminateResonCode : [],
	terminateReson : []
    });

     
  }

  getReasonForEndingEngineerHousingOnProjectPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ReasonForEndingEngineerHousingOnProject[]> => {
    return this.reasonForEndingEngineerHousingOnProjectService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.reasonForEndingEngineerHousingOnProjectService.delete(param.data.id)
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
    
  }
}

