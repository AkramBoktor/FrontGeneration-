
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisterTheMovementOfReadyToilets } from 'app/shared/models/register-the-movement-of-ready-toilets';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisterTheMovementOfReadyToiletsEditComponent } from '../register-the-movement-of-ready-toilets-edit/register-the-movement-of-ready-toilets-edit.component';
import { RegisterTheMovementOfReadyToiletsNewComponent } from '../register-the-movement-of-ready-toilets-new/register-the-movement-of-ready-toilets-new.component';
import { RegisterTheMovementOfReadyToiletsViewComponent } from '../register-the-movement-of-ready-toilets-view/register-the-movement-of-ready-toilets-view.component';
import { RegisterTheMovementOfReadyToiletsService } from '../shared/register-the-movement-of-ready-toilets.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-register-the-movement-of-ready-toilets-list',
  templateUrl: './register-the-movement-of-ready-toilets-list.component.html',
  styleUrls: ['./register-the-movement-of-ready-toilets-list.component.scss'],
  providers: []
})

export class RegisterTheMovementOfReadyToiletsListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private governoratesService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRegisterTheMovementOfReadyToilets: RegisterTheMovementOfReadyToilets;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: '  تاريخ الطلب ', field: 'orderDate' }),
	new GridColumnOptions({ headerName: ' كود  دوره المياه', field: 'toiletCode' }),
	new GridColumnOptions({ headerName: 'المدرسه المطلوب النقل منها ', field: 'schoolRequiredTransport' }),
	new GridColumnOptions({ headerName: 'المدرسه المطلوب النقل  اليها ', field: 'transportationSchool' }),
	new GridColumnOptions({ headerName: 'المحافظه ', field: 'governorate' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RegisterTheMovementOfReadyToiletsViewComponent,
    editDialogClassType: RegisterTheMovementOfReadyToiletsEditComponent,
    newDialogClassType: RegisterTheMovementOfReadyToiletsNewComponent,
  });
    constructor(
        injector: Injector,
        public registerTheMovementOfReadyToiletsService: RegisterTheMovementOfReadyToiletsService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRegisterTheMovementOfReadyToilets = new RegisterTheMovementOfReadyToilets();

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه المنقول منها',
	});


    this.searchForm = this.formBuilder.group({
     	orderDate : [],
	toiletCode : [],
	schoolRequiredTransport : [],
	transportationSchool : [],
	governorate : []
    });

     
  }

  getRegisterTheMovementOfReadyToiletsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RegisterTheMovementOfReadyToilets[]> => {
    return this.registerTheMovementOfReadyToiletsService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.registerTheMovementOfReadyToiletsService.delete(param.data.id)
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

