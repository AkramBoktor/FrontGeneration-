
import { Component, OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { SchoolsCurrentlyExtractingInsurance } from 'app/shared/models/schools-currently-extracting-insurance';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { SchoolsCurrentlyExtractingInsuranceEditComponent } from '../schools-currently-extracting-insurance-edit/schools-currently-extracting-insurance-edit.component';
import { SchoolsCurrentlyExtractingInsuranceNewComponent } from '../schools-currently-extracting-insurance-new/schools-currently-extracting-insurance-new.component';
import { SchoolsCurrentlyExtractingInsuranceViewComponent } from '../schools-currently-extracting-insurance-view/schools-currently-extracting-insurance-view.component';
import { SchoolsCurrentlyExtractingInsuranceService } from '../shared/schools-currently-extracting-insurance.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-schools-currently-extracting-insurance-list',
  templateUrl: './schools-currently-extracting-insurance-list.component.html',
  styleUrls: ['./schools-currently-extracting-insurance-list.component.scss'],
  providers: []
})

export class SchoolsCurrentlyExtractingInsuranceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [

  ];







  @Input() selectedSchoolsCurrentlyExtractingInsurance: SchoolsCurrentlyExtractingInsurance;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [

    new GridColumnOptions({ headerName: 'كود شركه التأمين', field: 'insuranceCompanyCode' }),
    new GridColumnOptions({ headerName: 'اسم شركةالتأمين', field: 'insuranceCompanyName' }),
    new GridColumnOptions({ headerName: 'كود المدرسه', field: 'schoolCode' }),
    new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
    new GridColumnOptions({ headerName: 'رقم الملحق', field: 'extensionNumber' }),
    new GridColumnOptions({ headerName: 'رقم النموزج', field: 'modelCode' }),
    new GridColumnOptions({ headerName: 'عدد الادوار', field: 'floorsNumber' }),
    new GridColumnOptions({ headerName: 'عدد الفصول ', field: 'classroomNumber' }),
    new GridColumnOptions({ headerName: 'رقم المدرسة في المجمعه', field: 'schoolNumber' }),
    new GridColumnOptions({ headerName: 'تاريخ التسليم للمجمعه', field: 'deliveryDate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: SchoolsCurrentlyExtractingInsuranceViewComponent,
    editDialogClassType: SchoolsCurrentlyExtractingInsuranceEditComponent,
    newDialogClassType: SchoolsCurrentlyExtractingInsuranceNewComponent,
  });
  constructor(
    injector: Injector,
    public schoolsCurrentlyExtractingInsuranceService: SchoolsCurrentlyExtractingInsuranceService) {
    super(injector);
  }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedSchoolsCurrentlyExtractingInsurance = new SchoolsCurrentlyExtractingInsurance();



    this.searchForm = this.formBuilder.group({
      insuranceCompanyCode: [],
      insuranceCompanyName: [],
      schoolCode: [],
      schoolName: [],
      extensionNumber: [],
      modelCode: [],
      floorsNumber: [],
      classroomNumber: [],
      schoolNumber: [],
      deliveryDate: []
    });


  }

  getSchoolsCurrentlyExtractingInsurancePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<SchoolsCurrentlyExtractingInsurance[]> => {
    return this.schoolsCurrentlyExtractingInsuranceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.schoolsCurrentlyExtractingInsuranceService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {

  }
}

