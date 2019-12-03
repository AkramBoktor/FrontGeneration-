
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TheListsRequiredToEquipAllSchools } from 'app/shared/models/the-lists-required-to-equip-all-schools';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheListsRequiredToEquipAllSchoolsEditComponent } from '../the-lists-required-to-equip-all-schools-edit/the-lists-required-to-equip-all-schools-edit.component';
import { TheListsRequiredToEquipAllSchoolsNewComponent } from '../the-lists-required-to-equip-all-schools-new/the-lists-required-to-equip-all-schools-new.component';
import { TheListsRequiredToEquipAllSchoolsViewComponent } from '../the-lists-required-to-equip-all-schools-view/the-lists-required-to-equip-all-schools-view.component';
import { TheListsRequiredToEquipAllSchoolsService } from '../shared/the-lists-required-to-equip-all-schools.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-lists-required-to-equip-all-schools-list',
  templateUrl: './the-lists-required-to-equip-all-schools-list.component.html',
  styleUrls: ['./the-lists-required-to-equip-all-schools-list.component.scss'],
  providers: []
})

export class TheListsRequiredToEquipAllSchoolsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private processingTypesService: LookupService;
private offeringTypesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedTheListsRequiredToEquipAllSchools: TheListsRequiredToEquipAllSchools;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المحافظة', field: 'governorateNumber ' }),
	new GridColumnOptions({ headerName: 'اسم القائمة', field: 'listName' }),
	new GridColumnOptions({ headerName: 'نوع الطرح ', field: 'offeringType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TheListsRequiredToEquipAllSchoolsViewComponent,
    editDialogClassType: TheListsRequiredToEquipAllSchoolsEditComponent,
    newDialogClassType: TheListsRequiredToEquipAllSchoolsNewComponent,
  });
    constructor(
        injector: Injector,
        public theListsRequiredToEquipAllSchoolsService: TheListsRequiredToEquipAllSchoolsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTheListsRequiredToEquipAllSchools = new TheListsRequiredToEquipAllSchools();

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح ',
	});


    this.searchForm = this.formBuilder.group({
     	bidNumber : [],
	listNumber : [],
	processingType : [],
	offeringType : []
    });

     
  }

  getTheListsRequiredToEquipAllSchoolsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TheListsRequiredToEquipAllSchools[]> => {
    return this.theListsRequiredToEquipAllSchoolsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.theListsRequiredToEquipAllSchoolsService.delete(param.data.id)
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
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

