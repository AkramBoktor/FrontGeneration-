
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DrainageDataForTheBuilding } from 'app/shared/models/drainage-data-for-the-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DrainageDataForTheBuildingService } from '../shared/drainage-data-for-the-building.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-drainage-data-for-the-building-edit',
  templateUrl: './drainage-data-for-the-building-edit.component.html',
  styleUrls: ['./drainage-data-for-the-building-edit.component.scss'],
  providers: []
})

export class DrainageDataForTheBuildingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDrainageDataForTheBuilding: DrainageDataForTheBuilding;
  drainageDataForTheBuildingForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private yesOrNosService: LookupService;


  
gaysonSelectOptions: MaterialSelectOptions;
plantationSelectOptions: MaterialSelectOptions;
sanitationDitchSelectOptions: MaterialSelectOptions;
candidateSelectOptions: MaterialSelectOptions;
tankAssemblySelectOptions: MaterialSelectOptions;
tankanalysisSelectOptions: MaterialSelectOptions;
sanitationLocalSelectOptions: MaterialSelectOptions;
sanitationGeneralSelectOptions: MaterialSelectOptions;
sanitationExistsSelectOptions: MaterialSelectOptions;

  
	@ViewChild('gayson', { static: true }) GaysonSelectComponent: MaterialSelectComponent;
	@ViewChild('plantation', { static: true }) PlantationSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationDitch', { static: true }) SanitationDitchSelectComponent: MaterialSelectComponent;
	@ViewChild('candidate', { static: true }) CandidateSelectComponent: MaterialSelectComponent;
	@ViewChild('tankAssembly', { static: true }) TankAssemblySelectComponent: MaterialSelectComponent;
	@ViewChild('tankanalysis', { static: true }) TankanalysisSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationLocal', { static: true }) SanitationLocalSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationGeneral', { static: true }) SanitationGeneralSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationExists', { static: true }) SanitationExistsSelectComponent: MaterialSelectComponent;

  
lengthIsVisible: boolean;
deepIsVisible: boolean;
widthIsVisible: boolean;


gaysonIsVisible: boolean;
plantationIsVisible: boolean;
sanitationDitchIsVisible: boolean;
candidateIsVisible: boolean;
tankAssemblyIsVisible: boolean;
tankanalysisIsVisible: boolean;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDrainageDataForTheBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<DrainageDataForTheBuildingEditComponent>,
    public drainageDataForTheBuildingService: DrainageDataForTheBuildingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDrainageDataForTheBuilding = new DrainageDataForTheBuilding();
    this.selectedDrainageDataForTheBuilding = this.selectedDrainageDataForTheBuildingDialog.data || this.selectedDrainageDataForTheBuilding;

    
	this.gaysonSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قيسون',
	});

	this.plantationSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'بياره',
	});

	this.sanitationDitchSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'خندق صرف',
	});

	this.candidateSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مرشح',
	});

	this.tankAssemblySelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'خزان تجميع',
	});

	this.tankanalysisSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'خزان تحليل',
	});

	this.sanitationLocalSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صرف محلى',
	});

	this.sanitationGeneralSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صرف عمومى ',
	});

	this.sanitationExistsSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'يوجد صرف',
	});


    this.drainageDataForTheBuildingForm = this.formBuilder.group({
      
  id : [this.selectedDrainageDataForTheBuilding.id],
  buildingCode : [this.selectedDrainageDataForTheBuilding.buildingCode, [ Validators.required ]],
  length : [this.selectedDrainageDataForTheBuilding.length, [ Validators.required ]],
  deep : [this.selectedDrainageDataForTheBuilding.deep, [ Validators.required ]],
  width : [this.selectedDrainageDataForTheBuilding.width, [ Validators.required ]],

  networkDepth : [this.selectedDrainageDataForTheBuilding.networkDepth, [ Validators.required ]],
  networkDiameter : [this.selectedDrainageDataForTheBuilding.networkDiameter, [ Validators.required ]],

  gayson : [this.selectedDrainageDataForTheBuilding.gayson, [ Validators.required ]],
  plantation : [this.selectedDrainageDataForTheBuilding.plantation, [ Validators.required ]],
  sanitationDitch : [this.selectedDrainageDataForTheBuilding.sanitationDitch, [ Validators.required ]],
  candidate : [this.selectedDrainageDataForTheBuilding.candidate, [ Validators.required ]],
  tankAssembly : [this.selectedDrainageDataForTheBuilding.tankAssembly, [ Validators.required ]],
  tankanalysis : [this.selectedDrainageDataForTheBuilding.tankanalysis, [ Validators.required ]],
  sanitationLocal : [this.selectedDrainageDataForTheBuilding.sanitationLocal, [ Validators.required ]],
  sanitationGeneral : [this.selectedDrainageDataForTheBuilding.sanitationGeneral, [ Validators.required ]],
  sanitationExists : [this.selectedDrainageDataForTheBuilding.sanitationExists, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.drainageDataForTheBuildingService.update(this.drainageDataForTheBuildingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.drainageDataForTheBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.drainageDataForTheBuildingForm.get(name);
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
