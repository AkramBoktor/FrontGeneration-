
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { TheMovementOfMaterialIndices } from 'app/shared/models/the-movement-of-material-indices';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheMovementOfMaterialIndicesEditComponent } from '../the-movement-of-material-indices-edit/the-movement-of-material-indices-edit.component';
import { TheMovementOfMaterialIndicesNewComponent } from '../the-movement-of-material-indices-new/the-movement-of-material-indices-new.component';
import { TheMovementOfMaterialIndicesViewComponent } from '../the-movement-of-material-indices-view/the-movement-of-material-indices-view.component';
import { TheMovementOfMaterialIndicesService } from '../shared/the-movement-of-material-indices.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-movement-of-material-indices-list',
  templateUrl: './the-movement-of-material-indices-list.component.html',
  styleUrls: ['./the-movement-of-material-indices-list.component.scss'],
  providers: []
})

export class TheMovementOfMaterialIndicesListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedTheMovementOfMaterialIndices: TheMovementOfMaterialIndices;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'الرقم القياسي', field: 'standardNumber' }),
	new GridColumnOptions({ headerName: 'اسم العنصر', field: 'itemName' }),
	new GridColumnOptions({ headerName: 'كود العنصر', field: 'elementCode' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: TheMovementOfMaterialIndicesViewComponent,
    editDialogClassType: TheMovementOfMaterialIndicesEditComponent,
    newDialogClassType: TheMovementOfMaterialIndicesNewComponent,
  });
    constructor(
        injector: Injector,
        public theMovementOfMaterialIndicesService: TheMovementOfMaterialIndicesService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedTheMovementOfMaterialIndices = new TheMovementOfMaterialIndices();

    

    this.searchForm = this.formBuilder.group({
     	startDateForMovement : [],
	endDateForMovement : []
    });

     
  }

  getTheMovementOfMaterialIndicesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<TheMovementOfMaterialIndices[]> => {
    return this.theMovementOfMaterialIndicesService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.theMovementOfMaterialIndicesService.delete(param.data.id)
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

