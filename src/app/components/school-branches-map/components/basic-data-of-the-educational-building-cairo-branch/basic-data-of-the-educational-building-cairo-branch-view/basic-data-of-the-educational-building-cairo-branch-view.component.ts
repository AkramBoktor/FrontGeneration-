
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BasicDataOfTheEducationalBuildingCairoBranch } from 'app/shared/models/basic-data-of-the-educational-building-cairo-branch';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BasicDataOfTheEducationalBuildingCairoBranchService } from '../shared/basic-data-of-the-educational-building-cairo-branch.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-basic-data-of-the-educational-building-cairo-branch-view',
  templateUrl: './basic-data-of-the-educational-building-cairo-branch-view.component.html',
  styleUrls: ['./basic-data-of-the-educational-building-cairo-branch-view.component.scss'],
  providers: []
})

export class BasicDataOfTheEducationalBuildingCairoBranchViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBasicDataOfTheEducationalBuildingCairoBranch: BasicDataOfTheEducationalBuildingCairoBranch;
  basicDataOfTheEducationalBuildingCairoBranchForm: FormGroup;

  private useBuildingPositionsService: LookupService;
private landOwnershipsService: LookupService;
private buildingOwnershipsService: LookupService;
private fenceStatusCodesService: LookupService;
private fenceStatusesService: LookupService;
private constructionMaterialsService: LookupService;
private effectTypeCodesService: LookupService;


  
usePositionSelectOptions: MaterialSelectOptions;
landOwnershipSelectOptions: MaterialSelectOptions;
buildingOwnershipSelectOptions: MaterialSelectOptions;
fenceCodeSelectOptions: MaterialSelectOptions;
fenceStateSelectOptions: MaterialSelectOptions;
buildingMaterialSelectOptions: MaterialSelectOptions;
positiveInfluentialStationsSelectOptions: MaterialSelectOptions;
negativeInfluentialStationsSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBasicDataOfTheEducationalBuildingCairoBranchDialog: any,
    @Optional() public dialogRef: MatDialogRef<BasicDataOfTheEducationalBuildingCairoBranchViewComponent>,
    public basicDataOfTheEducationalBuildingCairoBranchService: BasicDataOfTheEducationalBuildingCairoBranchService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataOfTheEducationalBuildingCairoBranch = this.selectedBasicDataOfTheEducationalBuildingCairoBranchDialog.data || this.selectedBasicDataOfTheEducationalBuildingCairoBranch;

    
	this.usePositionSelectOptions = new MaterialSelectOptions({
	 data: this.useBuildingPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف استخدام',
	});

	this.landOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكيه الارض',
	});

	this.buildingOwnershipSelectOptions = new MaterialSelectOptions({
	 data: this.buildingOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ملكيه المبني',
	});

	this.fenceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود السور',
	});

	this.fenceStateSelectOptions = new MaterialSelectOptions({
	 data: this.fenceStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله السور',
	});

	this.buildingMaterialSelectOptions = new MaterialSelectOptions({
	 data: this.constructionMaterialsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'ماده البناء',
	});

	this.positiveInfluentialStationsSelectOptions = new MaterialSelectOptions({
	 data: this.effectTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'محطات مؤثره ايجابي ',
	});

	this.negativeInfluentialStationsSelectOptions = new MaterialSelectOptions({
	 data: this.effectTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'محطات مؤثره سلبي',
	});


    this.basicDataOfTheEducationalBuildingCairoBranchForm = this.formBuilder.group({
      
  buildingCode : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.buildingCode],
  address : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.address],
  phoneNumber : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.phoneNumber],
  fenceHeight : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceHeight],
  fenceRibNorth : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibNorth],
  fenceRibSouth : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibSouth],
  fenceRibWest : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibWest],
  fenceRibEast : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceRibEast],
  northeastFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.northeastFence],
  northwestFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.northwestFence],
  southeastFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.southeastFence],
  southwestFence : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.southwestFence],
  coordinatesX : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.coordinatesX],
  coordinatesY : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.coordinatesY],
  coordinatesZ : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.coordinatesZ],
  usePosition : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.usePosition],
  landOwnership : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.landOwnership],
  buildingOwnership : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.buildingOwnership],
  fenceCode : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceCode],
  fenceState : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.fenceState],
  buildingMaterial : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.buildingMaterial],
  positiveInfluentialStations : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.positiveInfluentialStations],
  negativeInfluentialStations : [this.selectedBasicDataOfTheEducationalBuildingCairoBranch.negativeInfluentialStations]
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
    return this.basicDataOfTheEducationalBuildingCairoBranchForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.basicDataOfTheEducationalBuildingCairoBranchForm.controls)) {
      this.basicDataOfTheEducationalBuildingCairoBranchForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.useBuildingPositionsService = new LookupService('usebuildingpositions', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
this.buildingOwnershipsService = new LookupService('buildingownerships', this.http);
this.fenceStatusCodesService = new LookupService('fencestatuscodes', this.http);
this.fenceStatusesService = new LookupService('fencestatuses', this.http);
this.constructionMaterialsService = new LookupService('constructionmaterials', this.http);
this.effectTypeCodesService = new LookupService('effecttypecodes', this.http);
this.effectTypeCodesService = new LookupService('effecttypecodes', this.http);
  }
}

