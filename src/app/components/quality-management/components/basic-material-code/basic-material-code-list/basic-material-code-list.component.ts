
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BasicMaterialCode } from 'app/shared/models/basic-material-code';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BasicMaterialCodeEditComponent } from '../basic-material-code-edit/basic-material-code-edit.component';
import { BasicMaterialCodeNewComponent } from '../basic-material-code-new/basic-material-code-new.component';
import { BasicMaterialCodeViewComponent } from '../basic-material-code-view/basic-material-code-view.component';
import { BasicMaterialCodeService } from '../shared/basic-material-code.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-basic-material-code-list',
  templateUrl: './basic-material-code-list.component.html',
  styleUrls: ['./basic-material-code-list.component.scss'],
  providers: []
})

export class BasicMaterialCodeListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedBasicMaterialCode: BasicMaterialCode;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الماده الأساسية', field: 'basicMaterialCode' }),
	new GridColumnOptions({ headerName: 'اسم المادة الاساسية', field: 'basicMaterialName' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BasicMaterialCodeViewComponent,
    editDialogClassType: BasicMaterialCodeEditComponent,
    newDialogClassType: BasicMaterialCodeNewComponent,
  });
    constructor(
        injector: Injector,
        public basicMaterialCodeService: BasicMaterialCodeService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBasicMaterialCode = new BasicMaterialCode();

    

    this.searchForm = this.formBuilder.group({
     	basicMaterialCode : [],
	basicMaterialName : []
    });

     
  }

  getBasicMaterialCodesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BasicMaterialCode[]> => {
    return this.basicMaterialCodeService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.basicMaterialCodeService.delete(param.data.id)
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

