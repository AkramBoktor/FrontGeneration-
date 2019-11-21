
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { AdjustThePositionOfProjects } from 'app/shared/models/adjust-the-position-of-projects';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AdjustThePositionOfProjectsEditComponent } from '../adjust-the-position-of-projects-edit/adjust-the-position-of-projects-edit.component';
import { AdjustThePositionOfProjectsNewComponent } from '../adjust-the-position-of-projects-new/adjust-the-position-of-projects-new.component';
import { AdjustThePositionOfProjectsViewComponent } from '../adjust-the-position-of-projects-view/adjust-the-position-of-projects-view.component';
import { AdjustThePositionOfProjectsService } from '../shared/adjust-the-position-of-projects.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-adjust-the-position-of-projects-list',
  templateUrl: './adjust-the-position-of-projects-list.component.html',
  styleUrls: ['./adjust-the-position-of-projects-list.component.scss'],
  providers: []
})

export class AdjustThePositionOfProjectsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedAdjustThePositionOfProjects: AdjustThePositionOfProjects;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الرقم التعريفي للمبني', field: 'buildingNumber' }),
	new GridColumnOptions({ headerName: 'كود الملحق', field: 'extensionCode' }),
	new GridColumnOptions({ headerName: 'سنة الخطة', field: 'pLanYear' }),
	new GridColumnOptions({ headerName: 'كود الموقف', field: 'positionCode' }),
	new GridColumnOptions({ headerName: 'الفروع ', field: 'branch' }),
	new GridColumnOptions({ headerName: 'نوع الانشاء', field: 'constructionType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: AdjustThePositionOfProjectsViewComponent,
    editDialogClassType: AdjustThePositionOfProjectsEditComponent,
    newDialogClassType: AdjustThePositionOfProjectsNewComponent,
  });
    constructor(
        injector: Injector,
        public adjustThePositionOfProjectsService: AdjustThePositionOfProjectsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedAdjustThePositionOfProjects = new AdjustThePositionOfProjects();

    

    this.searchForm = this.formBuilder.group({
     	buildingNumber : []
    });

     
  }

  getAdjustThePositionOfProjectsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<AdjustThePositionOfProjects[]> => {
    return this.adjustThePositionOfProjectsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.adjustThePositionOfProjectsService.delete(param.data.id)
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

