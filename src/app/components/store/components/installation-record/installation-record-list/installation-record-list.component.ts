
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GridColumnOptions, GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { FormControlError, GridPaginatedSortedFiltered } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InstallationRecord } from 'app/shared/models/installation-record';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { InstallationRecordEditComponent } from '../installation-record-edit/installation-record-edit.component';
import { InstallationRecordNewComponent } from '../installation-record-new/installation-record-new.component';
import { InstallationRecordViewComponent } from '../installation-record-view/installation-record-view.component';
import { InstallationRecordService } from '../shared/installation-record.service';

@Component({
  selector: 'app-installation-record-list',
  templateUrl: './installation-record-list.component.html',
  styleUrls: ['./installation-record-list.component.scss'],
  providers: []
})

export class InstallationRecordListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private itemStatusesService: LookupService;

  
itemConditionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('itemCondition', { static: true }) ItemConditionSelectComponent: MaterialSelectComponent;

  
  @Input() selectedInstallationRecord: InstallationRecord;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'كود الموظف', field: 'employeeCode' }),
	new GridColumnOptions({ headerName: 'رقم الصنف', field: 'itemNo' }),
	new GridColumnOptions({ headerName: 'رقم المخزن', field: 'storeNumber' }),
	new GridColumnOptions({ headerName: 'رقم اذن الصرف', field: 'exchangeAuthorizationNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الصرف', field: 'exchangeDate' }),
	new GridColumnOptions({ headerName: 'الكمية الصرف', field: 'quantityExchange' }),
	new GridColumnOptions({ headerName: 'تاريخ المحضر ', field: 'recordDate' }),
	new GridColumnOptions({ headerName: 'رقم المحضر', field: 'recordNumber' }),
	new GridColumnOptions({ headerName: 'مكان التركيب', field: 'installationPlace' }),
	new GridColumnOptions({ headerName: 'حاله الصنف', field: 'itemCondition' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: InstallationRecordViewComponent,
    editDialogClassType: InstallationRecordEditComponent,
    newDialogClassType: InstallationRecordNewComponent,
  });
    constructor(
        injector: Injector,
        public installationRecordService: InstallationRecordService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedInstallationRecord = new InstallationRecord();

    
	this.itemConditionSelectOptions = new MaterialSelectOptions({
	 data: this.itemStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصنف',
	});


    this.searchForm = this.formBuilder.group({
     	employeeCode : [],
	itemNo : [],
	storeNumber : [],
	exchangeAuthorizationNumber : [],
	exchangeDate : [],
	recordDate : [],
	recordNumber : [],
	itemCondition : []
    });

     
  }

  getInstallationRecordsPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<InstallationRecord[]> => {
    return this.installationRecordService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.installationRecordService.delete(param.data.id)
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
    this.itemStatusesService = new LookupService('itemstatuses', this.http);
  }
}

