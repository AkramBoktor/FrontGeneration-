
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GeneralLocation } from 'app/shared/models/general-location';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralLocationService } from '../shared/general-location.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-location-view',
  templateUrl: './general-location-view.component.html',
  styleUrls: ['./general-location-view.component.scss'],
  providers: []
})

export class GeneralLocationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralLocation: GeneralLocation;
  generalLocationForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private mainRoadTypeCodesService: LookupService;
private directionCodesService: LookupService;

  
sectionCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
mainRoadTypeCodeSelectOptions: MaterialSelectOptions;
mainRoadStatusCodeSelectOptions: MaterialSelectOptions;
roadDirectionCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralLocationDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralLocationViewComponent>,
    public generalLocationService: GeneralLocationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralLocation = this.selectedGeneralLocationDialog.data || this.selectedGeneralLocation;

    
	this.sectionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.mainRoadTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.mainRoadTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود نوع الطريق الرئيسي',
	});

	this.mainRoadStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.mainRoadTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الطريق الرئيسي',
	});

	this.roadDirectionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود اتجاه الحركه',
	});


    this.generalLocationForm = this.formBuilder.group({
      
  buildingCode : [this.selectedGeneralLocation.buildingCode],
  roadWidth : [this.selectedGeneralLocation.roadWidth],
  type : [this.selectedGeneralLocation.type],
  sectionCode : [this.selectedGeneralLocation.sectionCode],
  branchCode : [this.selectedGeneralLocation.branchCode],
  mainRoadTypeCode : [this.selectedGeneralLocation.mainRoadTypeCode],
  mainRoadStatusCode : [this.selectedGeneralLocation.mainRoadStatusCode],
  roadDirectionCode : [this.selectedGeneralLocation.roadDirectionCode]
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
    return this.generalLocationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.generalLocationForm.controls)) {
      this.generalLocationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.mainRoadTypeCodesService = new LookupService('mainroadtypecodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
}

