
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GeneralLocationOfAnAdministrativeBuilding } from 'app/shared/models/general-location-of-an-administrative-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GeneralLocationOfAnAdministrativeBuildingService } from '../shared/general-location-of-an-administrative-building.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-general-location-of-an-administrative-building-edit',
  templateUrl: './general-location-of-an-administrative-building-edit.component.html',
  styleUrls: ['./general-location-of-an-administrative-building-edit.component.scss'],
  providers: []
})

export class GeneralLocationOfAnAdministrativeBuildingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGeneralLocationOfAnAdministrativeBuilding: GeneralLocationOfAnAdministrativeBuilding;
  generalLocationOfAnAdministrativeBuildingForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionCodesService: LookupService;
private neighborStatesService: LookupService;

  
centerCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
limitDirectionSelectOptions: MaterialSelectOptions;
adjacentNeighborStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centerCode', { static: true }) CenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('limitDirection', { static: true }) LimitDirectionSelectComponent: MaterialSelectComponent;
	@ViewChild('adjacentNeighborStatus', { static: true }) AdjacentNeighborStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGeneralLocationOfAnAdministrativeBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<GeneralLocationOfAnAdministrativeBuildingEditComponent>,
    public generalLocationOfAnAdministrativeBuildingService: GeneralLocationOfAnAdministrativeBuildingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGeneralLocationOfAnAdministrativeBuilding = new GeneralLocationOfAnAdministrativeBuilding();
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
      
  id : [this.selectedGeneralLocationOfAnAdministrativeBuilding.id],
  buildingCode : [this.selectedGeneralLocationOfAnAdministrativeBuilding.buildingCode, [ Validators.required ]],
  lengthLimit : [this.selectedGeneralLocationOfAnAdministrativeBuilding.lengthLimit, [ Validators.required ]],
  theAngleOfInclinationOfTheLimit : [this.selectedGeneralLocationOfAnAdministrativeBuilding.theAngleOfInclinationOfTheLimit, [ Validators.required ]],
  descriptionOfTheLimit : [this.selectedGeneralLocationOfAnAdministrativeBuilding.descriptionOfTheLimit, [ Validators.required ]],
  mainRoadLevel : [this.selectedGeneralLocationOfAnAdministrativeBuilding.mainRoadLevel, [ Validators.required ]],
  groundFloorLevel : [this.selectedGeneralLocationOfAnAdministrativeBuilding.groundFloorLevel, [ Validators.required ]],
  theLevelOfTheCourtyardWithinTheSite : [this.selectedGeneralLocationOfAnAdministrativeBuilding.theLevelOfTheCourtyardWithinTheSite, [ Validators.required ]],
  seaLevel : [this.selectedGeneralLocationOfAnAdministrativeBuilding.seaLevel, [ Validators.required ]],
  centerCode : [this.selectedGeneralLocationOfAnAdministrativeBuilding.centerCode, [ Validators.required ]],
  branchCode : [this.selectedGeneralLocationOfAnAdministrativeBuilding.branchCode, [ Validators.required ]],
  limitDirection : [this.selectedGeneralLocationOfAnAdministrativeBuilding.limitDirection, [ Validators.required ]],
  adjacentNeighborStatus : [this.selectedGeneralLocationOfAnAdministrativeBuilding.adjacentNeighborStatus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.generalLocationOfAnAdministrativeBuildingService.update(this.generalLocationOfAnAdministrativeBuildingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.generalLocationOfAnAdministrativeBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.generalLocationOfAnAdministrativeBuildingForm.get(name);
  }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
this.neighborStatesService = new LookupService('neighborstates', this.http);
  }
}
