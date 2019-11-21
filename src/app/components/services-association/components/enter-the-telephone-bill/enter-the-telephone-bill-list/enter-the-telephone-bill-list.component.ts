
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { EnterTheTelephoneBill } from 'app/shared/models/enter-the-telephone-bill';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EnterTheTelephoneBillEditComponent } from '../enter-the-telephone-bill-edit/enter-the-telephone-bill-edit.component';
import { EnterTheTelephoneBillNewComponent } from '../enter-the-telephone-bill-new/enter-the-telephone-bill-new.component';
import { EnterTheTelephoneBillViewComponent } from '../enter-the-telephone-bill-view/enter-the-telephone-bill-view.component';
import { EnterTheTelephoneBillService } from '../shared/enter-the-telephone-bill.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-enter-the-telephone-bill-list',
  templateUrl: './enter-the-telephone-bill-list.component.html',
  styleUrls: ['./enter-the-telephone-bill-list.component.scss'],
  providers: []
})

export class EnterTheTelephoneBillListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private departmentsSectionsService: LookupService;

  
admistrationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('admistrationCode', { static: true }) AdmistrationCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedEnterTheTelephoneBill: EnterTheTelephoneBill;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: ' رقم التليفون', field: 'phoneNumber' }),
	new GridColumnOptions({ headerName: ' كود الادارة', field: 'admistrationCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: EnterTheTelephoneBillViewComponent,
    editDialogClassType: EnterTheTelephoneBillEditComponent,
    newDialogClassType: EnterTheTelephoneBillNewComponent,
  });
    constructor(
        injector: Injector,
        public enterTheTelephoneBillService: EnterTheTelephoneBillService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedEnterTheTelephoneBill = new EnterTheTelephoneBill();

    
	this.admistrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الادارة',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	phoneNumber : [],
	admistrationCode : []
    });

     
  }

  getEnterTheTelephoneBillPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<EnterTheTelephoneBill[]> => {
    return this.enterTheTelephoneBillService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.enterTheTelephoneBillService.delete(param.data.id)
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
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}

