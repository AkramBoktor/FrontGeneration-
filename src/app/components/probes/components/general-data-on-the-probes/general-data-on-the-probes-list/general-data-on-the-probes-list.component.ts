
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralDataOnTheProbes } from 'app/shared/models/general-data-on-the-probes';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GeneralDataOnTheProbesEditComponent } from '../general-data-on-the-probes-edit/general-data-on-the-probes-edit.component';
import { GeneralDataOnTheProbesNewComponent } from '../general-data-on-the-probes-new/general-data-on-the-probes-new.component';
import { GeneralDataOnTheProbesViewComponent } from '../general-data-on-the-probes-view/general-data-on-the-probes-view.component';
import { GeneralDataOnTheProbesService } from '../shared/general-data-on-the-probes.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-data-on-the-probes-list',
  templateUrl: './general-data-on-the-probes-list.component.html',
  styleUrls: ['./general-data-on-the-probes-list.component.scss'],
  providers: []
})

export class GeneralDataOnTheProbesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  
  @Input() selectedGeneralDataOnTheProbes: GeneralDataOnTheProbes;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم المدرسه', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'الاحداثي السيني', field: 'coordinatesX' }),
	new GridColumnOptions({ headerName: 'الاحداثي الصادي', field: 'coordinatesY' }),
	new GridColumnOptions({ headerName: 'منسوب سطح الارض', field: 'groundLevel' }),
	new GridColumnOptions({ headerName: 'نسبه الاملاح الكليه', field: 'totalSaltsPercentage' }),
	new GridColumnOptions({ headerName: 'نسبه الكربونات', field: 'carbonateRatio' }),
	new GridColumnOptions({ headerName: 'نسبه الكلوريدات', field: 'chloridesRatio' }),
	new GridColumnOptions({ headerName: 'نسبة الكبريتات', field: 'sulfateRatio' }),
	new GridColumnOptions({ headerName: 'عمق التاسيس', field: 'foundationDepth' }),
	new GridColumnOptions({ headerName: 'جهد التاسيس', field: 'foundationEffort' }),
	new GridColumnOptions({ headerName: 'نوع الاساسات المقترحه', field: 'foundationsProposedType' }),
	new GridColumnOptions({ headerName: 'الجهه المنفذه', field: 'executingAgency' }),
	new GridColumnOptions({ headerName: 'المحافظه', field: 'governorate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: GeneralDataOnTheProbesViewComponent,
    editDialogClassType: GeneralDataOnTheProbesEditComponent,
    newDialogClassType: GeneralDataOnTheProbesNewComponent,
  });
    constructor(
        injector: Injector,
        public generalDataOnTheProbesService: GeneralDataOnTheProbesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedGeneralDataOnTheProbes = new GeneralDataOnTheProbes();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه',
	});


    this.searchForm = this.formBuilder.group({
     	schoolName : [],
	executingAgency : [],
	governorate : []
    });

     
  }

  getGeneralDataOnTheProbesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<GeneralDataOnTheProbes[]> => {
    return this.generalDataOnTheProbesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.generalDataOnTheProbesService.delete(param.data.id)
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
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

