
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RequiredServiceses } from 'app/shared/models/required-serviceses';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RequiredServicesesEditComponent } from '../required-serviceses-edit/required-serviceses-edit.component';
import { RequiredServicesesNewComponent } from '../required-serviceses-new/required-serviceses-new.component';
import { RequiredServicesesViewComponent } from '../required-serviceses-view/required-serviceses-view.component';
import { RequiredServicesesService } from '../shared/required-serviceses.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-required-serviceses-list',
  templateUrl: './required-serviceses-list.component.html',
  styleUrls: ['./required-serviceses-list.component.scss'],
  providers: []
})

export class RequiredServicesesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private entityNamesService: LookupService;
private governoratesService: LookupService;
private sectionsOrCentersService: LookupService;

  
entityNameSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
centerOrSectionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityName', { static: true }) EntityNameSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('centerOrSection', { static: true }) CenterOrSectionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRequiredServiceses: RequiredServiceses;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'تاريخ الطلب', field: 'applicationDate' }),
	new GridColumnOptions({ headerName: 'رقم الطلب', field: 'orderNumber' }),
	new GridColumnOptions({ headerName: 'اسم الجهة', field: 'entityName' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'مركز – قسم', field: 'centerOrSection' }),
	new GridColumnOptions({ headerName: 'مساحة الارض', field: 'landArea' }),
	new GridColumnOptions({ headerName: 'النسبة البنائية', field: 'structuralRatio' }),
	new GridColumnOptions({ headerName: 'عدد الادوار', field: 'floorsNumber' }),
	new GridColumnOptions({ headerName: 'نوع  الخدمة', field: 'serviceType' }),
	new GridColumnOptions({ headerName: 'كود الخدمة', field: 'serviceCode' }),
	new GridColumnOptions({ headerName: 'اسم الخدمة', field: 'serviceName' }),
	new GridColumnOptions({ headerName: 'النسبة المطلوبة مقدما', field: 'advanceRequiredRatio' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RequiredServicesesViewComponent,
    editDialogClassType: RequiredServicesesEditComponent,
    newDialogClassType: RequiredServicesesNewComponent,
  });
    constructor(
        injector: Injector,
        public requiredServicesesService: RequiredServicesesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRequiredServiceses = new RequiredServiceses();

    
	this.entityNameSelectOptions = new MaterialSelectOptions({
	 data: this.entityNamesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اسم الجهة',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.centerOrSectionSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مركز – قسم',
	});


    this.searchForm = this.formBuilder.group({
     	applicationDate : [],
	orderNumber : [],
	schoolName : [],
	landArea : [],
	structuralRatio : [],
	floorsNumber : [],
	serviceType : [],
	serviceCode : [],
	serviceName : [],
	advanceRequiredRatio : [],
	entityName : [],
	governorate : [],
	centerOrSection : []
    });

     
  }

  getRequiredServicesesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RequiredServiceses[]> => {
    return this.requiredServicesesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.requiredServicesesService.delete(param.data.id)
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
    this.entityNamesService = new LookupService('entitynames', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
}

