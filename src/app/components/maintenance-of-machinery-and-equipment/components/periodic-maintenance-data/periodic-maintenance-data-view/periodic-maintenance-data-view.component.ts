
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PeriodicMaintenanceData } from 'app/shared/models/periodic-maintenance-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PeriodicMaintenanceDataService } from '../shared/periodic-maintenance-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-periodic-maintenance-data-view',
  templateUrl: './periodic-maintenance-data-view.component.html',
  styleUrls: ['./periodic-maintenance-data-view.component.scss'],
  providers: []
})

export class PeriodicMaintenanceDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPeriodicMaintenanceData: PeriodicMaintenanceData;
  periodicMaintenanceDataForm: FormGroup;

  private buildingTypesService: LookupService;
private workshopNumbersService: LookupService;
private maintenanceStatusesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
workshopNumberSelectOptions: MaterialSelectOptions;
maintenanceStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPeriodicMaintenanceDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<PeriodicMaintenanceDataViewComponent>,
    public periodicMaintenanceDataService: PeriodicMaintenanceDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedPeriodicMaintenanceData.buildingCode],
  dateofMaintenancePlan : [this.selectedPeriodicMaintenanceData.dateofMaintenancePlan],
  dateofActualMaintenance : [this.selectedPeriodicMaintenanceData.dateofActualMaintenance],
  buildingType : [this.selectedPeriodicMaintenanceData.buildingType],
  workshopNumber : [this.selectedPeriodicMaintenanceData.workshopNumber],
  maintenanceStatus : [this.selectedPeriodicMaintenanceData.maintenanceStatus]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.periodicMaintenanceDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.periodicMaintenanceDataForm.controls)) {
      this.periodicMaintenanceDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.workshopNumbersService = new LookupService('workshopnumbers', this.http);
this.maintenanceStatusesService = new LookupService('maintenancestatuses', this.http);
  }
}

