
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaintenanceOfEducationalBuildingsListOfReadyToilet } from 'app/shared/models/maintenance-of-educational-buildings-list-of-ready-toilet';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaintenanceOfEducationalBuildingsListOfReadyToiletService } from '../shared/maintenance-of-educational-buildings-list-of-ready-toilet.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-maintenance-of-educational-buildings-list-of-ready-toilet-view',
  templateUrl: './maintenance-of-educational-buildings-list-of-ready-toilet-view.component.html',
  styleUrls: ['./maintenance-of-educational-buildings-list-of-ready-toilet-view.component.scss'],
  providers: []
})

export class MaintenanceOfEducationalBuildingsListOfReadyToiletViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMaintenanceOfEducationalBuildingsListOfReadyToilet: MaintenanceOfEducationalBuildingsListOfReadyToilet;
  maintenanceOfEducationalBuildingsListOfReadyToiletForm: FormGroup;

  private governoratesService: LookupService;

  
fromGovernmentSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMaintenanceOfEducationalBuildingsListOfReadyToiletDialog: any,
    @Optional() public dialogRef: MatDialogRef<MaintenanceOfEducationalBuildingsListOfReadyToiletViewComponent>,
    public maintenanceOfEducationalBuildingsListOfReadyToiletService: MaintenanceOfEducationalBuildingsListOfReadyToiletService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet = this.selectedMaintenanceOfEducationalBuildingsListOfReadyToiletDialog.data || this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet;

    
	this.fromGovernmentSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظه ',
	});


    this.maintenanceOfEducationalBuildingsListOfReadyToiletForm = this.formBuilder.group({
      
  orderDate : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.orderDate],
  toiletCode : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.toiletCode],
  fromSchool : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.fromSchool],
  toSchool : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.toSchool],
  fromGovernment : [this.selectedMaintenanceOfEducationalBuildingsListOfReadyToilet.fromGovernment]
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
    return this.maintenanceOfEducationalBuildingsListOfReadyToiletForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.maintenanceOfEducationalBuildingsListOfReadyToiletForm.controls)) {
      this.maintenanceOfEducationalBuildingsListOfReadyToiletForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
  }
}

