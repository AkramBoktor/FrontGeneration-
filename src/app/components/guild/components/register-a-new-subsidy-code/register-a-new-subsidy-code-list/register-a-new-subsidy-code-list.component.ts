
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisterANewSubsidyCode } from 'app/shared/models/register-a-new-subsidy-code';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisterANewSubsidyCodeEditComponent } from '../register-a-new-subsidy-code-edit/register-a-new-subsidy-code-edit.component';
import { RegisterANewSubsidyCodeNewComponent } from '../register-a-new-subsidy-code-new/register-a-new-subsidy-code-new.component';
import { RegisterANewSubsidyCodeViewComponent } from '../register-a-new-subsidy-code-view/register-a-new-subsidy-code-view.component';
import { RegisterANewSubsidyCodeService } from '../shared/register-a-new-subsidy-code.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-register-a-new-subsidy-code-list',
  templateUrl: './register-a-new-subsidy-code-list.component.html',
  styleUrls: ['./register-a-new-subsidy-code-list.component.scss'],
  providers: []
})

export class RegisterANewSubsidyCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedRegisterANewSubsidyCode: RegisterANewSubsidyCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: ' كود  الاعانة ', field: 'subsidyCode' }),
	new GridColumnOptions({ headerName: ' المبلغ   الاعانة ', field: 'subsidyAmount' }),
	new GridColumnOptions({ headerName: ' اسم  الاعانة', field: 'subsidyName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RegisterANewSubsidyCodeViewComponent,
    editDialogClassType: RegisterANewSubsidyCodeEditComponent,
    newDialogClassType: RegisterANewSubsidyCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public registerANewSubsidyCodeService: RegisterANewSubsidyCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRegisterANewSubsidyCode = new RegisterANewSubsidyCode();

    

    this.searchForm = this.formBuilder.group({
     	subsidyCode : [],
	subsidyAmount : [],
	subsidyName : []
    });

     
  }

  getRegisterANewSubsidyCodePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RegisterANewSubsidyCode[]> => {
    return this.registerANewSubsidyCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.registerANewSubsidyCodeService.delete(param.data.id)
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

