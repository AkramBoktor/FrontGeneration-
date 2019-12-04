
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ExternalJobType } from 'app/shared/models/external-job-type';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExternalJobTypeEditComponent } from '../external-job-type-edit/external-job-type-edit.component';
import { ExternalJobTypeNewComponent } from '../external-job-type-new/external-job-type-new.component';
import { ExternalJobTypeViewComponent } from '../external-job-type-view/external-job-type-view.component';
import { ExternalJobTypeService } from '../shared/external-job-type.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-external-job-type-list',
  templateUrl: './external-job-type-list.component.html',
  styleUrls: ['./external-job-type-list.component.scss'],
  providers: []
})

export class ExternalJobTypeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedExternalJobType: ExternalJobType;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الوظيفة الخارجية', field: 'eexternaljobcode' }),
	new GridColumnOptions({ headerName: 'اسم الوظيفة الخارجية', field: 'externaljobname' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ExternalJobTypeViewComponent,
    editDialogClassType: ExternalJobTypeEditComponent,
    newDialogClassType: ExternalJobTypeNewComponent,
  });
    constructor(
        injector: Injector,
        public externalJobTypeService: ExternalJobTypeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedExternalJobType = new ExternalJobType();

    

    this.searchForm = this.formBuilder.group({
     	eexternaljobcode : [],
	externaljobname : []
    });

     
  }

  getExternalJobTypesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ExternalJobType[]> => {
    return this.externalJobTypeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.externalJobTypeService.delete(param.data.id)
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

