
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PeriodicMaintenanceData } from 'app/shared/models/periodic-maintenance-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PeriodicMaintenanceDataService } from '../shared/periodic-maintenance-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-periodic-maintenance-data-edit',
  templateUrl: './periodic-maintenance-data-edit.component.html',
  styleUrls: ['./periodic-maintenance-data-edit.component.scss'],
  providers: []
})

export class PeriodicMaintenanceDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPeriodicMaintenanceData: PeriodicMaintenanceData;
  periodicMaintenanceDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private buildingTypesService: LookupService;
private workshopNumbersService: LookupService;
private maintenanceStatusesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
workshopNumberSelectOptions: MaterialSelectOptions;
maintenanceStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workshopNumber', { static: true }) WorkshopNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('maintenanceStatus', { static: true }) MaintenanceStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPeriodicMaintenanceDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PeriodicMaintenanceDataEditComponent>,
    public periodicMaintenanceDataService: PeriodicMaintenanceDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeriodicMaintenanceData = new PeriodicMaintenanceData();
    this.selectedPeriodicMaintenanceData = this.selectedPeriodicMaintenanceDataDialog.data || this.selectedPeriodicMaintenanceData;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.workshopNumberSelectOptions = new MaterialSelectOptions({
	 data: this.workshopNumbersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الورشه',
	});

	this.maintenanceStatusSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الصيانه',
	});


    this.periodicMaintenanceDataForm = this.formBuilder.group({
      
  id : [this.selectedPeriodicMaintenanceData.id],
  buildingCode : [this.selectedPeriodicMaintenanceData.buildingCode, [ Validators.required ]],
  dateofMaintenancePlan : [this.selectedPeriodicMaintenanceData.dateofMaintenancePlan, [ Validators.required ]],
  dateofActualMaintenance : [this.selectedPeriodicMaintenanceData.dateofActualMaintenance, [ Validators.required ]],
  buildingType : [this.selectedPeriodicMaintenanceData.buildingType, [ Validators.required ]],
  workshopNumber : [this.selectedPeriodicMaintenanceData.workshopNumber, [ Validators.required ]],
  maintenanceStatus : [this.selectedPeriodicMaintenanceData.maintenanceStatus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.periodicMaintenanceDataService.update(this.periodicMaintenanceDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.periodicMaintenanceDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.periodicMaintenanceDataForm.get(name);
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.workshopNumbersService = new LookupService('workshopnumbers', this.http);
this.maintenanceStatusesService = new LookupService('maintenancestatuses', this.http);
  }
}
