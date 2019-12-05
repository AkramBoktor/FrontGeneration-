
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation } from 'app/shared/models/data-of-facilities-and-their-distance-from-the-general-location';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService } from '../shared/data-of-facilities-and-their-distance-from-the-general-location.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-of-facilities-and-their-distance-from-the-general-location-edit',
  templateUrl: './data-of-facilities-and-their-distance-from-the-general-location-edit.component.html',
  styleUrls: ['./data-of-facilities-and-their-distance-from-the-general-location-edit.component.scss'],
  providers: []
})

export class DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation;
  dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocationDialog: any,
    @Optional() public dialogRef: MatDialogRef<DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationEditComponent>,
    public dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation = new DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation();
    this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation = this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocationDialog.data || this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation;

    

    this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm = this.formBuilder.group({
      
  id : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.id],
  landCode : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.landCode, [ Validators.required ]],
  facilityCode : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.facilityCode, [ Validators.required ]],
  facilityName : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.facilityName, [ Validators.required ]],
  facilityDimension : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.facilityDimension, [ Validators.required ]],
  notes : [this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation.notes, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService.update(this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
