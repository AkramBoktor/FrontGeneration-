
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DrainageDataForTheBuilding } from 'app/shared/models/drainage-data-for-the-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DrainageDataForTheBuildingService } from '../shared/drainage-data-for-the-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-drainage-data-for-the-building-view',
  templateUrl: './drainage-data-for-the-building-view.component.html',
  styleUrls: ['./drainage-data-for-the-building-view.component.scss'],
  providers: []
})

export class DrainageDataForTheBuildingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDrainageDataForTheBuilding: DrainageDataForTheBuilding;
  drainageDataForTheBuildingForm: FormGroup;

  private yesOrNosService: LookupService;


  
sanitationExistsSelectOptions: MaterialSelectOptions;
sanitationGeneralSelectOptions: MaterialSelectOptions;
sanitationLocalSelectOptions: MaterialSelectOptions;
tankanalysisSelectOptions: MaterialSelectOptions;
tankAssemblySelectOptions: MaterialSelectOptions;
candidateSelectOptions: MaterialSelectOptions;
sanitationDitchSelectOptions: MaterialSelectOptions;
plantationSelectOptions: MaterialSelectOptions;
gaysonSelectOptions: MaterialSelectOptions;

  
lengthIsVisible: boolean;
widthIsVisible: boolean;
deepIsVisible: boolean;
tankanalysisIsVisible: boolean;
tankAssemblyIsVisible: boolean;
candidateIsVisible: boolean;
sanitationDitchIsVisible: boolean;
plantationIsVisible: boolean;
gaysonIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDrainageDataForTheBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<DrainageDataForTheBuildingViewComponent>,
    public drainageDataForTheBuildingService: DrainageDataForTheBuildingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDrainageDataForTheBuilding = this.selectedDrainageDataForTheBuildingDialog.data || this.selectedDrainageDataForTheBuilding;

    
	this.sanitationExistsSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'يوجد صرف',
	});

	this.sanitationGeneralSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صرف عمومى ',
	});

	this.sanitationLocalSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صرف محلى',
	});

	this.tankanalysisSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'خزان تحليل',
	});

	this.tankAssemblySelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'خزان تجميع',
	});

	this.candidateSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مرشح',
	});

	this.sanitationDitchSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'خندق صرف',
	});

	this.plantationSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'بياره',
	});

	this.gaysonSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قيسون',
	});


    this.drainageDataForTheBuildingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedDrainageDataForTheBuilding.buildingCode],
  networkDiameter : [this.selectedDrainageDataForTheBuilding.networkDiameter],
  networkDepth : [this.selectedDrainageDataForTheBuilding.networkDepth],
  length : [this.selectedDrainageDataForTheBuilding.length],
  width : [this.selectedDrainageDataForTheBuilding.width],
  deep : [this.selectedDrainageDataForTheBuilding.deep],
  sanitationExists : [this.selectedDrainageDataForTheBuilding.sanitationExists],
  sanitationGeneral : [this.selectedDrainageDataForTheBuilding.sanitationGeneral],
  sanitationLocal : [this.selectedDrainageDataForTheBuilding.sanitationLocal],
  tankanalysis : [this.selectedDrainageDataForTheBuilding.tankanalysis],
  tankAssembly : [this.selectedDrainageDataForTheBuilding.tankAssembly],
  candidate : [this.selectedDrainageDataForTheBuilding.candidate],
  sanitationDitch : [this.selectedDrainageDataForTheBuilding.sanitationDitch],
  plantation : [this.selectedDrainageDataForTheBuilding.plantation],
  gayson : [this.selectedDrainageDataForTheBuilding.gayson]
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
    return this.drainageDataForTheBuildingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.drainageDataForTheBuildingForm.controls)) {
      this.drainageDataForTheBuildingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
  }
}

