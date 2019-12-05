
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ProjectData } from 'app/shared/models/project-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProjectDataEditComponent } from '../project-data-edit/project-data-edit.component';
import { ProjectDataNewComponent } from '../project-data-new/project-data-new.component';
import { ProjectDataViewComponent } from '../project-data-view/project-data-view.component';
import { ProjectDataService } from '../shared/project-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-project-data-list',
  templateUrl: './project-data-list.component.html',
  styleUrls: ['./project-data-list.component.scss'],
  providers: []
})

export class ProjectDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedProjectData: ProjectData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المشروع', field: 'projectCode' }),
	new GridColumnOptions({ headerName: 'اسم المشروع', field: 'projectName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ProjectDataViewComponent,
    editDialogClassType: ProjectDataEditComponent,
    newDialogClassType: ProjectDataNewComponent,
  });
    constructor(
        injector: Injector,
        public projectDataService: ProjectDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedProjectData = new ProjectData();

    

    this.searchForm = this.formBuilder.group({
     	projectCode : [],
	projectName : []
    });

     
  }

  getProjectsDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ProjectData[]> => {
    return this.projectDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.projectDataService.delete(param.data.id)
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

