
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisterANewDestinationCode } from 'app/shared/models/register-a-new-destination-code';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisterANewDestinationCodeEditComponent } from '../register-a-new-destination-code-edit/register-a-new-destination-code-edit.component';
import { RegisterANewDestinationCodeNewComponent } from '../register-a-new-destination-code-new/register-a-new-destination-code-new.component';
import { RegisterANewDestinationCodeViewComponent } from '../register-a-new-destination-code-view/register-a-new-destination-code-view.component';
import { RegisterANewDestinationCodeService } from '../shared/register-a-new-destination-code.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-register-a-new-destination-code-list',
  templateUrl: './register-a-new-destination-code-list.component.html',
  styleUrls: ['./register-a-new-destination-code-list.component.scss'],
  providers: []
})

export class RegisterANewDestinationCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private entityCodesService: LookupService;

  
entityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;

  
  @Input() selectedRegisterANewDestinationCode: RegisterANewDestinationCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' المبلغ   الجهة ', field: 'entityAmount' }),
	new GridColumnOptions({ headerName: ' اسم  الجهة', field: 'entityName' }),
	new GridColumnOptions({ headerName: ' كود  الجهة ', field: 'entityCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RegisterANewDestinationCodeViewComponent,
    editDialogClassType: RegisterANewDestinationCodeEditComponent,
    newDialogClassType: RegisterANewDestinationCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public registerANewDestinationCodeService: RegisterANewDestinationCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRegisterANewDestinationCode = new RegisterANewDestinationCode();

    
	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود  الجهة ',
	});


    this.searchForm = this.formBuilder.group({
     	entityAmount : [],
	entityName : [],
	entityCode : []
    });

     
  }

  getRegisterANewDestinationCodePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RegisterANewDestinationCode[]> => {
    return this.registerANewDestinationCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.registerANewDestinationCodeService.delete(param.data.id)
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
    this.entityCodesService = new LookupService('entitycodes', this.http);
  }
}

