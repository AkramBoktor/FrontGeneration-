
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolAreExcludedFromQualityControl } from 'app/shared/models/school-are-excluded-from-quality-control';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolAreExcludedFromQualityControlEditComponent } from '../school-are-excluded-from-quality-control-edit/school-are-excluded-from-quality-control-edit.component';
import { SchoolAreExcludedFromQualityControlNewComponent } from '../school-are-excluded-from-quality-control-new/school-are-excluded-from-quality-control-new.component';
import { SchoolAreExcludedFromQualityControlViewComponent } from '../school-are-excluded-from-quality-control-view/school-are-excluded-from-quality-control-view.component';
import { SchoolAreExcludedFromQualityControlService } from '../shared/school-are-excluded-from-quality-control.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-school-are-excluded-from-quality-control-list',
  templateUrl: './school-are-excluded-from-quality-control-list.component.html',
  styleUrls: ['./school-are-excluded-from-quality-control-list.component.scss'],
  providers: []
})

export class SchoolAreExcludedFromQualityControlListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedSchoolAreExcludedFromQualityControl: SchoolAreExcludedFromQualityControl;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود المدرسة', field: 'schoolCode' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'التاريخ', field: 'date' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SchoolAreExcludedFromQualityControlViewComponent,
    editDialogClassType: SchoolAreExcludedFromQualityControlEditComponent,
    newDialogClassType: SchoolAreExcludedFromQualityControlNewComponent,
  });
    constructor(
        injector: Injector,
        public schoolAreExcludedFromQualityControlService: SchoolAreExcludedFromQualityControlService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSchoolAreExcludedFromQualityControl = new SchoolAreExcludedFromQualityControl();

    

    this.searchForm = this.formBuilder.group({
     	schoolCode : []
    });

     
  }

  getSchoolsAreExcludedFromQualityControlPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SchoolAreExcludedFromQualityControl[]> => {
    return this.schoolAreExcludedFromQualityControlService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.schoolAreExcludedFromQualityControlService.delete(param.data.id)
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

