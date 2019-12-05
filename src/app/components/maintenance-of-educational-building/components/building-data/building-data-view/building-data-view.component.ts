
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BuildingData } from 'app/shared/models/building-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BuildingDataService } from '../shared/building-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-building-data-view',
  templateUrl: './building-data-view.component.html',
  styleUrls: ['./building-data-view.component.scss'],
  providers: []
})

export class BuildingDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBuildingData: BuildingData;
  buildingDataForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBuildingDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<BuildingDataViewComponent>,
    public buildingDataService: BuildingDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBuildingData = this.selectedBuildingDataDialog.data || this.selectedBuildingData;

    

    this.buildingDataForm = this.formBuilder.group({
      
  actingEngineer : [this.selectedBuildingData.actingEngineer],
  sectorHead : [this.selectedBuildingData.sectorHead],
  maintenanceDepartmentHead : [this.selectedBuildingData.maintenanceDepartmentHead],
  areaManager : [this.selectedBuildingData.areaManager],
  followerEngineerOfficeBranch : [this.selectedBuildingData.followerEngineerOfficeBranch]
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
    return this.buildingDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.buildingDataForm.controls)) {
      this.buildingDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

