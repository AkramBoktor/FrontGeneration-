
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TheCorrespondingSchoolNumber } from 'app/shared/models/the-corresponding-school-number';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheCorrespondingSchoolNumberEditComponent } from '../the-corresponding-school-number-edit/the-corresponding-school-number-edit.component';
import { TheCorrespondingSchoolNumberNewComponent } from '../the-corresponding-school-number-new/the-corresponding-school-number-new.component';
import { TheCorrespondingSchoolNumberViewComponent } from '../the-corresponding-school-number-view/the-corresponding-school-number-view.component';
import { TheCorrespondingSchoolNumberService } from '../shared/the-corresponding-school-number.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-corresponding-school-number-list',
  templateUrl: './the-corresponding-school-number-list.component.html',
  styleUrls: ['./the-corresponding-school-number-list.component.scss'],
  providers: []
})

export class TheCorrespondingSchoolNumberListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedTheCorrespondingSchoolNumber: TheCorrespondingSchoolNumber;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الطلب', field: 'oderNumber' }),
	new GridColumnOptions({ headerName: 'كود المدرسة الحالي', field: 'currentSchoolCode' }),
	new GridColumnOptions({ headerName: 'كود المدرسة المطابق عليها', field: 'correspondingSchool' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TheCorrespondingSchoolNumberViewComponent,
    editDialogClassType: TheCorrespondingSchoolNumberEditComponent,
    newDialogClassType: TheCorrespondingSchoolNumberNewComponent,
  });
    constructor(
        injector: Injector,
        public theCorrespondingSchoolNumberService: TheCorrespondingSchoolNumberService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTheCorrespondingSchoolNumber = new TheCorrespondingSchoolNumber();

    

    this.searchForm = this.formBuilder.group({
     	oderNumber : [],
	currentSchoolCode : [],
	correspondingSchool : []
    });

     
  }

  getTheCorrespondingSchoolsNumbersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TheCorrespondingSchoolNumber[]> => {
    return this.theCorrespondingSchoolNumberService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.theCorrespondingSchoolNumberService.delete(param.data.id)
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

