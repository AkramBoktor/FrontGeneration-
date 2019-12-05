
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation } from 'app/shared/models/data-of-facilities-and-their-distance-from-the-general-location';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService } from '../shared/data-of-facilities-and-their-distance-from-the-general-location.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-data-of-facilities-and-their-distance-from-the-general-location-new',
  templateUrl: './data-of-facilities-and-their-distance-from-the-general-location-new.component.html',
  styleUrls: ['./data-of-facilities-and-their-distance-from-the-general-location-new.component.scss'],
  providers: [
    ]
})

export class DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationNewComponent extends AppBaseComponent implements OnInit {
  dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm: FormGroup;
  @Input() selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationNewComponent>,
    public dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService: DataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDataOfFacilitiesAndTheirDistanceFromTheGeneralLocation = new DataOfFacilitiesAndTheirDistanceFromTheGeneralLocation();

    

    this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm = this.formBuilder.group({
     
  id : [0],
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
    this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService.create(this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm.value)
        .pipe(switchMap(x => {
			return this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.dataOfFacilitiesAndTheirDistanceFromTheGeneralLocationForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
