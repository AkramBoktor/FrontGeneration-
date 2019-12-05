
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { RegisterANewCollectionCode } from 'app/shared/models/register-a-new-collection-code';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RegisterANewCollectionCodeEditComponent } from '../register-a-new-collection-code-edit/register-a-new-collection-code-edit.component';
import { RegisterANewCollectionCodeNewComponent } from '../register-a-new-collection-code-new/register-a-new-collection-code-new.component';
import { RegisterANewCollectionCodeViewComponent } from '../register-a-new-collection-code-view/register-a-new-collection-code-view.component';
import { RegisterANewCollectionCodeService } from '../shared/register-a-new-collection-code.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-register-a-new-collection-code-list',
  templateUrl: './register-a-new-collection-code-list.component.html',
  styleUrls: ['./register-a-new-collection-code-list.component.scss'],
  providers: []
})

export class RegisterANewCollectionCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedRegisterANewCollectionCode: RegisterANewCollectionCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود التحصيل', field: 'collectionCode' }),
	new GridColumnOptions({ headerName: '  المبلغ   تحصيل ', field: 'collectionAmount' }),
	new GridColumnOptions({ headerName: '  اسم  تحصيل ', field: 'collectionName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: RegisterANewCollectionCodeViewComponent,
    editDialogClassType: RegisterANewCollectionCodeEditComponent,
    newDialogClassType: RegisterANewCollectionCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public registerANewCollectionCodeService: RegisterANewCollectionCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedRegisterANewCollectionCode = new RegisterANewCollectionCode();

    

    this.searchForm = this.formBuilder.group({
     	collectionCode : [],
	collectionName : []
    });

     
  }

  getRegisterANewCollectionCodePaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<RegisterANewCollectionCode[]> => {
    return this.registerANewCollectionCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.registerANewCollectionCodeService.delete(param.data.id)
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

