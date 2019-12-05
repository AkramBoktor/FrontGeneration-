
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { LaboratorySpace } from 'app/shared/models/laboratory-space';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LaboratorySpaceEditComponent } from '../laboratory-space-edit/laboratory-space-edit.component';
import { LaboratorySpaceNewComponent } from '../laboratory-space-new/laboratory-space-new.component';
import { LaboratorySpaceViewComponent } from '../laboratory-space-view/laboratory-space-view.component';
import { LaboratorySpaceService } from '../shared/laboratory-space.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-laboratory-space-list',
  templateUrl: './laboratory-space-list.component.html',
  styleUrls: ['./laboratory-space-list.component.scss'],
  providers: []
})

export class LaboratorySpaceListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedLaboratorySpace: LaboratorySpace;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'اسم الفراغ', field: 'spaceName' }),
	new GridColumnOptions({ headerName: 'رقم الملحق', field: 'annexNumber' }),
	new GridColumnOptions({ headerName: 'رقم الدور', field: 'floorNumber' }),
	new GridColumnOptions({ headerName: 'مسلسل الفراغ', field: 'spaceSeries' }),
	new GridColumnOptions({ headerName: 'كود الفراغ', field: 'spaceCode' }),
	new GridColumnOptions({ headerName: 'الفراغ لم يصله اجهزة', field: 'spaceNotConnectedToDevices' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: LaboratorySpaceViewComponent,
    editDialogClassType: LaboratorySpaceEditComponent,
    newDialogClassType: LaboratorySpaceNewComponent,
  });
    constructor(
        injector: Injector,
        public laboratorySpaceService: LaboratorySpaceService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedLaboratorySpace = new LaboratorySpace();

    

    this.searchForm = this.formBuilder.group({
     	buildingCode : []
    });

     
  }

  getLaboratorySpacesPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<LaboratorySpace[]> => {
    return this.laboratorySpaceService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.laboratorySpaceService.delete(param.data.id)
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

