
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ConcreteMixtureDataForTheWorkOfOthers } from 'app/shared/models/concrete-mixture-data-for-the-work-of-others';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ConcreteMixtureDataForTheWorkOfOthersEditComponent } from '../concrete-mixture-data-for-the-work-of-others-edit/concrete-mixture-data-for-the-work-of-others-edit.component';
import { ConcreteMixtureDataForTheWorkOfOthersNewComponent } from '../concrete-mixture-data-for-the-work-of-others-new/concrete-mixture-data-for-the-work-of-others-new.component';
import { ConcreteMixtureDataForTheWorkOfOthersViewComponent } from '../concrete-mixture-data-for-the-work-of-others-view/concrete-mixture-data-for-the-work-of-others-view.component';
import { ConcreteMixtureDataForTheWorkOfOthersService } from '../shared/concrete-mixture-data-for-the-work-of-others.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-concrete-mixture-data-for-the-work-of-others-list',
  templateUrl: './concrete-mixture-data-for-the-work-of-others-list.component.html',
  styleUrls: ['./concrete-mixture-data-for-the-work-of-others-list.component.scss'],
  providers: []
})

export class ConcreteMixtureDataForTheWorkOfOthersListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private mixtureTypesService: LookupService;

  
mixtureTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('mixtureType', { static: true }) MixtureTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedConcreteMixtureDataForTheWorkOfOthers: ConcreteMixtureDataForTheWorkOfOthers;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تهشيم الزلط', field: 'stonesCrush' }),
	new GridColumnOptions({ headerName: 'رقم الطلب', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'تهشيم الدولوميت', field: 'dolomiteStones' }),
	new GridColumnOptions({ headerName: 'الوزن الحجمي للزلط', field: 'stonesWeightVolume' }),
	new GridColumnOptions({ headerName: 'الوزن الحجمي للدلوميت', field: 'dolomiteWeightVolume' }),
	new GridColumnOptions({ headerName: 'الوزن الحجمي للرمل', field: 'sandWeightVolume' }),
	new GridColumnOptions({ headerName: 'اسمنت بالوزن', field: 'cementWeight' }),
	new GridColumnOptions({ headerName: 'اسمنت بالحجم', field: 'cementBulk' }),
	new GridColumnOptions({ headerName: 'مياه بالوزن', field: 'waterWeight' }),
	new GridColumnOptions({ headerName: 'مياه بالحجم', field: 'waterVolume' }),
	new GridColumnOptions({ headerName: 'رمل بالوزن', field: 'sandWeight' }),
	new GridColumnOptions({ headerName: 'رمل بالحجم', field: 'sandVolume' }),
	new GridColumnOptions({ headerName: 'زلط متدرج بالوزن', field: 'stonesWeight' }),
	new GridColumnOptions({ headerName: 'دلوميت بالوزن', field: 'dolomiteWeight' }),
	new GridColumnOptions({ headerName: 'دلوميت بالحجم', field: 'dolomiteVolume' }),
	new GridColumnOptions({ headerName: 'الوزن النوعي للرمل', field: 'sandSpecificWeight' }),
	new GridColumnOptions({ headerName: 'الوزن النوعي للزلط', field: 'stonesSpecificWeight' }),
	new GridColumnOptions({ headerName: 'الوزن النوعي للدلوميت', field: 'dolomiteSpecificWeight' }),
	new GridColumnOptions({ headerName: 'الوزن النوعي للركام الخليط', field: 'aggregatesSpecificWeight' }),
	new GridColumnOptions({ headerName: 'الهبوط بالمعمل', field: 'laboratoryLanding' }),
	new GridColumnOptions({ headerName: 'زلط متدرج بالحجم', field: 'stonesVolume' }),
	new GridColumnOptions({ headerName: 'الاسمنت المستخدم', field: 'cementUsed' }),
	new GridColumnOptions({ headerName: 'نوع الخلطة', field: 'mixtureType' }),
	new GridColumnOptions({ headerName: 'رمل تدرج منطقه', field: 'sandGradientArea' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ConcreteMixtureDataForTheWorkOfOthersViewComponent,
    editDialogClassType: ConcreteMixtureDataForTheWorkOfOthersEditComponent,
    newDialogClassType: ConcreteMixtureDataForTheWorkOfOthersNewComponent,
  });
    constructor(
        injector: Injector,
        public concreteMixtureDataForTheWorkOfOthersService: ConcreteMixtureDataForTheWorkOfOthersService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedConcreteMixtureDataForTheWorkOfOthers = new ConcreteMixtureDataForTheWorkOfOthers();

    
	this.mixtureTypeSelectOptions = new MaterialSelectOptions({
	 data: this.mixtureTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخلطة',
	});


    this.searchForm = this.formBuilder.group({
     	schoolNumber : [],
	region : [],
	serialMix : [],
	mixtureType : []
    });

     
  }

  getConcreteMixturesDataForTheWorkOfOthersPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ConcreteMixtureDataForTheWorkOfOthers[]> => {
    return this.concreteMixtureDataForTheWorkOfOthersService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.concreteMixtureDataForTheWorkOfOthersService.delete(param.data.id)
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

