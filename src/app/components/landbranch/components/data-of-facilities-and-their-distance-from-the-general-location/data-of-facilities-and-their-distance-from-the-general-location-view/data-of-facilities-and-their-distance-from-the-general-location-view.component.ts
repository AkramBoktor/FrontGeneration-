
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation } from 'app/shared/models/data-of-facilities-and-their-distance-from-the-general-location';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService } from '../shared/data-of-facilities-and-their-distance-from-the-general-location.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-data-of-facilities-and-their-distance-from-the-general-location-view',
  templateUrl: './data-of-facilities-and-their-distance-from-the-general-location-view.component.html',
  styleUrls: ['./data-of-facilities-and-their-distance-from-the-general-location-view.component.scss'],
  providers: []
})

export class DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation;
  dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocationDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationViewComponent>,
    public dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation = this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocationDialog.data || this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation;

    

    this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm = this.formBuilder.group({
      
  landCode : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.landCode],
  facilityCode : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.facilityCode],
  facilityName : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.facilityName],
  facilityDimension : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.facilityDimension],
  notes : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.notes]
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
    return this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm.controls)) {
      this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

