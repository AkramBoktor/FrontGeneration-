
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GeneralLocationOfAnAdministrativeBuilding } from 'app/shared/models/general-location-of-an-administrative-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GeneralLocationOfAnAdministrativeBuildingService } from '../shared/general-location-of-an-administrative-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-general-location-of-an-administrative-building-view',
  templateUrl: './general-location-of-an-administrative-building-view.component.html',
  styleUrls: ['./general-location-of-an-administrative-building-view.component.scss'],
  providers: []
})

export class GeneralLocationOfAnAdministrativeBuildingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralLocationOfAnAdministrativeBuilding: GeneralLocationOfAnAdministrativeBuilding;
  generalLocationOfAnAdministrativeBuildingForm: FormGroup;

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionCodesService: LookupService;
private neighborStatesService: LookupService;

  
centerCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
limitDirectionSelectOptions: MaterialSelectOptions;
adjacentNeighborStatusSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralLocationOfAnAdministrativeBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralLocationOfAnAdministrativeBuildingViewComponent>,
    public generalLocationOfAnAdministrativeBuildingService: GeneralLocationOfAnAdministrativeBuildingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralLocationOfAnAdministrativeBuilding = this.selectedGeneralLocationOfAnAdministrativeBuildingDialog.data || this.selectedGeneralLocationOfAnAdministrativeBuilding;

    
	this.centerCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.limitDirectionSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'اتجاه الحد',
	});

	this.adjacentNeighborStatusSelectOptions = new MaterialSelectOptions({
	 data: this.neighborStatesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حالة الجار الملاصق',
	});


    this.generalLocationOfAnAdministrativeBuildingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedGeneralLocationOfAnAdministrativeBuilding.buildingCode],
  lengthLimit : [this.selectedGeneralLocationOfAnAdministrativeBuilding.lengthLimit],
  theAngleOfInclinationOfTheLimit : [this.selectedGeneralLocationOfAnAdministrativeBuilding.theAngleOfInclinationOfTheLimit],
  descriptionOfTheLimit : [this.selectedGeneralLocationOfAnAdministrativeBuilding.descriptionOfTheLimit],
  mainRoadLevel : [this.selectedGeneralLocationOfAnAdministrativeBuilding.mainRoadLevel],
  groundFloorLevel : [this.selectedGeneralLocationOfAnAdministrativeBuilding.groundFloorLevel],
  theLevelOfTheCourtyardWithinTheSite : [this.selectedGeneralLocationOfAnAdministrativeBuilding.theLevelOfTheCourtyardWithinTheSite],
  seaLevel : [this.selectedGeneralLocationOfAnAdministrativeBuilding.seaLevel],
  centerCode : [this.selectedGeneralLocationOfAnAdministrativeBuilding.centerCode],
  branchCode : [this.selectedGeneralLocationOfAnAdministrativeBuilding.branchCode],
  limitDirection : [this.selectedGeneralLocationOfAnAdministrativeBuilding.limitDirection],
  adjacentNeighborStatus : [this.selectedGeneralLocationOfAnAdministrativeBuilding.adjacentNeighborStatus]
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
    return this.generalLocationOfAnAdministrativeBuildingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.generalLocationOfAnAdministrativeBuildingForm.controls)) {
      this.generalLocationOfAnAdministrativeBuildingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
this.neighborStatesService = new LookupService('neighborstates', this.http);
  }
}

