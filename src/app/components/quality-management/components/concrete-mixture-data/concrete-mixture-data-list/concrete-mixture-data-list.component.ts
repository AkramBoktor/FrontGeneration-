
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ConcreteMixtureData } from 'app/shared/models/concrete-mixture-data';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ConcreteMixtureDataEditComponent } from '../concrete-mixture-data-edit/concrete-mixture-data-edit.component';
import { ConcreteMixtureDataNewComponent } from '../concrete-mixture-data-new/concrete-mixture-data-new.component';
import { ConcreteMixtureDataViewComponent } from '../concrete-mixture-data-view/concrete-mixture-data-view.component';
import { ConcreteMixtureDataService } from '../shared/concrete-mixture-data.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-concrete-mixture-data-list',
  templateUrl: './concrete-mixture-data-list.component.html',
  styleUrls: ['./concrete-mixture-data-list.component.scss'],
  providers: []
})

export class ConcreteMixtureDataListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private mixtureTypesService: LookupService;

  
mixtureTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('mixtureType', { static: true }) MixtureTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedConcreteMixtureData: ConcreteMixtureData;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الطلب', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'تهشيم الزلط', field: 'stonesCrush' }),
	new GridColumnOptions({ headerName: 'الوزن الحجمي للزلط', field: 'stonesWeightVolume' }),
	new GridColumnOptions({ headerName: 'الوزن الحجمي للدلوميت', field: 'dolomiteWeightVolume' }),
	new GridColumnOptions({ headerName: 'الوزن الحجمي للرمل', field: 'sandWeightVolume' }),
	new GridColumnOptions({ headerName: 'الهبوط بالمعمل', field: 'laboratoryLanding' }),
	new GridColumnOptions({ headerName: 'الوزن النوعي للركام الخليط', field: 'aggregatesSpecificWeight' }),
	new GridColumnOptions({ headerName: 'الوزن النوعي للدلوميت', field: 'dolomiteSpecificWeight' }),
	new GridColumnOptions({ headerName: 'الوزن النوعي للزلط', field: 'stonesSpecificWeight' }),
	new GridColumnOptions({ headerName: 'الوزن النوعي للرمل', field: 'sandSpecificWeight' }),
	new GridColumnOptions({ headerName: 'دلوميت بالحجم', field: 'dolomiteVolume' }),
	new GridColumnOptions({ headerName: 'دلوميت بالوزن', field: 'dolomiteWeight' }),
	new GridColumnOptions({ headerName: 'زلط متدرج بالحجم', field: 'stonesVolume' }),
	new GridColumnOptions({ headerName: 'زلط متدرج بالوزن', field: 'stonesWeight' }),
	new GridColumnOptions({ headerName: 'رمل بالحجم', field: 'sandVolume' }),
	new GridColumnOptions({ headerName: 'رمل بالوزن', field: 'sandWeight' }),
	new GridColumnOptions({ headerName: 'مياه بالحجم', field: 'waterVolume' }),
	new GridColumnOptions({ headerName: 'مياه بالوزن', field: 'waterWeight' }),
	new GridColumnOptions({ headerName: 'اسمنت بالحجم', field: 'cementBulk' }),
	new GridColumnOptions({ headerName: 'اسمنت بالوزن', field: 'cementWeight' }),
	new GridColumnOptions({ headerName: 'تهشيم الدولوميت', field: 'dolomiteStones' }),
	new GridColumnOptions({ headerName: 'الاسمنت المستخدم', field: 'cementUsed' }),
	new GridColumnOptions({ headerName: 'نوع الخلطة', field: 'mixtureType' }),
	new GridColumnOptions({ headerName: 'رمل تدرج منطقه', field: 'sandGradientArea' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ConcreteMixtureDataViewComponent,
    editDialogClassType: ConcreteMixtureDataEditComponent,
    newDialogClassType: ConcreteMixtureDataNewComponent,
  });
    constructor(
        injector: Injector,
        public concreteMixtureDataService: ConcreteMixtureDataService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedConcreteMixtureData = new ConcreteMixtureData();

    
	this.mixtureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.mixtureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخلطة',
	});


    this.searchForm = this.formBuilder.group({
     	serialMix : [],
	region : [],
	schoolNumber : [],
	mixtureType : []
    });

     
  }

  getConcreteMixturesDataPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ConcreteMixtureData[]> => {
    return this.concreteMixtureDataService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.concreteMixtureDataService.delete(param.data.id)
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
    this.mixtureTypesService = new LookupService('mixturetypes', this.http);
  }
}

