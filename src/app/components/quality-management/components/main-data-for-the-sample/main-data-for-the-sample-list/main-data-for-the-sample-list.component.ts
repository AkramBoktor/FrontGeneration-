
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { MainDataForTheSample } from 'app/shared/models/main-data-for-the-sample';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MainDataForTheSampleEditComponent } from '../main-data-for-the-sample-edit/main-data-for-the-sample-edit.component';
import { MainDataForTheSampleNewComponent } from '../main-data-for-the-sample-new/main-data-for-the-sample-new.component';
import { MainDataForTheSampleViewComponent } from '../main-data-for-the-sample-view/main-data-for-the-sample-view.component';
import { MainDataForTheSampleService } from '../shared/main-data-for-the-sample.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-main-data-for-the-sample-list',
  templateUrl: './main-data-for-the-sample-list.component.html',
  styleUrls: ['./main-data-for-the-sample-list.component.scss'],
  providers: []
})

export class MainDataForTheSampleListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedMainDataForTheSample: MainDataForTheSample;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود توصيف العينة', field: 'sampleSpecificationCode' }),
	new GridColumnOptions({ headerName: 'المادة الأساسية', field: 'basicMaterial' }),
	new GridColumnOptions({ headerName: 'المادة الفرعية', field: 'subMaterial' }),
	new GridColumnOptions({ headerName: 'كود الاختبار', field: 'testCode' }),
	new GridColumnOptions({ headerName: 'اقل عدد من العينات', field: 'samplesMinimumNumber' }),
	new GridColumnOptions({ headerName: 'المعايرة', field: 'calibration' }),
	new GridColumnOptions({ headerName: 'الوحده', field: 'unit' }),
	new GridColumnOptions({ headerName: 'القيمة العيارية', field: 'standardValue' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: MainDataForTheSampleViewComponent,
    editDialogClassType: MainDataForTheSampleEditComponent,
    newDialogClassType: MainDataForTheSampleNewComponent,
  });
    constructor(
        injector: Injector,
        public mainDataForTheSampleService: MainDataForTheSampleService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedMainDataForTheSample = new MainDataForTheSample();

    

    this.searchForm = this.formBuilder.group({
     	sampleSpecificationCode : [],
	basicMaterial : [],
	subMaterial : []
    });

     
  }

  getMainDataForTheSamplesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<MainDataForTheSample[]> => {
    return this.mainDataForTheSampleService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.mainDataForTheSampleService.delete(param.data.id)
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

