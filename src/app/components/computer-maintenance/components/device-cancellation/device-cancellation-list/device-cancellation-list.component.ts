
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { DeviceCancellation } from 'app/shared/models/device-cancellation';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeviceCancellationEditComponent } from '../device-cancellation-edit/device-cancellation-edit.component';
import { DeviceCancellationNewComponent } from '../device-cancellation-new/device-cancellation-new.component';
import { DeviceCancellationViewComponent } from '../device-cancellation-view/device-cancellation-view.component';
import { DeviceCancellationService } from '../shared/device-cancellation.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-device-cancellation-list',
  templateUrl: './device-cancellation-list.component.html',
  styleUrls: ['./device-cancellation-list.component.scss'],
  providers: []
})

export class DeviceCancellationListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedDeviceCancellation: DeviceCancellation;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'نوع  المعدة', field: 'equipmentType' }),
	new GridColumnOptions({ headerName: 'نوع المعمل', field: 'laboratoryType' }),
	new GridColumnOptions({ headerName: 'المحافظة', field: 'governorate' }),
	new GridColumnOptions({ headerName: 'اسم المدرسة', field: 'schoolName' }),
	new GridColumnOptions({ headerName: 'رقم الجهاز', field: 'deviceNumber' }),
	new GridColumnOptions({ headerName: 'نوع الجهاز', field: 'deviceType' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: DeviceCancellationViewComponent,
    editDialogClassType: DeviceCancellationEditComponent,
    newDialogClassType: DeviceCancellationNewComponent,
  });
    constructor(
        injector: Injector,
        public deviceCancellationService: DeviceCancellationService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedDeviceCancellation = new DeviceCancellation();

    

    this.searchForm = this.formBuilder.group({
     	periodFrom : [],
	periodTo : [],
	equipmentType : [],
	deviceType : [],
	laboratoryType : []
    });

     
  }

  getDeviceCancellationPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<DeviceCancellation[]> => {
    return this.deviceCancellationService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.deviceCancellationService.delete(param.data.id)
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

