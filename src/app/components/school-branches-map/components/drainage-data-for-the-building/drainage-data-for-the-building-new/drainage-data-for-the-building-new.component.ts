
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DrainageDataForTheBuilding } from 'app/shared/models/drainage-data-for-the-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DrainageDataForTheBuildingService } from '../shared/drainage-data-for-the-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-drainage-data-for-the-building-new',
  templateUrl: './drainage-data-for-the-building-new.component.html',
  styleUrls: ['./drainage-data-for-the-building-new.component.scss'],
  providers: [
    ]
})

export class DrainageDataForTheBuildingNewComponent extends AppBaseComponent implements OnInit {
  drainageDataForTheBuildingForm: FormGroup;
  @Input() selectedDrainageDataForTheBuilding: DrainageDataForTheBuilding;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('sanitationExists', { static: true }) SanitationExistsSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationGeneral', { static: true }) SanitationGeneralSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationLocal', { static: true }) SanitationLocalSelectComponent: MaterialSelectComponent;
	@ViewChild('tankanalysis', { static: true }) TankanalysisSelectComponent: MaterialSelectComponent;
	@ViewChild('tankAssembly', { static: true }) TankAssemblySelectComponent: MaterialSelectComponent;
	@ViewChild('candidate', { static: true }) CandidateSelectComponent: MaterialSelectComponent;
	@ViewChild('sanitationDitch', { static: true }) SanitationDitchSelectComponent: MaterialSelectComponent;
	@ViewChild('plantation', { static: true }) PlantationSelectComponent: MaterialSelectComponent;
	@ViewChild('gayson', { static: true }) GaysonSelectComponent: MaterialSelectComponent;

  
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
    @Optional() public dialogRef: MatDialogRef<DrainageDataForTheBuildingNewComponent>,
    public drainageDataForTheBuildingService: DrainageDataForTheBuildingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDrainageDataForTheBuilding = new DrainageDataForTheBuilding();

    
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
     
  id : [0],
  buildingCode : [this.selectedDrainageDataForTheBuilding.buildingCode, [ Validators.required ]],
  networkDiameter : [this.selectedDrainageDataForTheBuilding.networkDiameter, [ Validators.required ]],
  networkDepth : [this.selectedDrainageDataForTheBuilding.networkDepth, [ Validators.required ]],
  length : [this.selectedDrainageDataForTheBuilding.length, [ Validators.required ]],
  width : [this.selectedDrainageDataForTheBuilding.width, [ Validators.required ]],
  deep : [this.selectedDrainageDataForTheBuilding.deep, [ Validators.required ]],
  sanitationExists : [this.selectedDrainageDataForTheBuilding.sanitationExists, [ Validators.required ]],
  sanitationGeneral : [this.selectedDrainageDataForTheBuilding.sanitationGeneral, [ Validators.required ]],
  sanitationLocal : [this.selectedDrainageDataForTheBuilding.sanitationLocal, [ Validators.required ]],
  tankanalysis : [this.selectedDrainageDataForTheBuilding.tankanalysis, [ Validators.required ]],
  tankAssembly : [this.selectedDrainageDataForTheBuilding.tankAssembly, [ Validators.required ]],
  candidate : [this.selectedDrainageDataForTheBuilding.candidate, [ Validators.required ]],
  sanitationDitch : [this.selectedDrainageDataForTheBuilding.sanitationDitch, [ Validators.required ]],
  plantation : [this.selectedDrainageDataForTheBuilding.plantation, [ Validators.required ]],
  gayson : [this.selectedDrainageDataForTheBuilding.gayson, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    
	this.drainageDataForTheBuildingForm.get('sanitationLocal').valueChanges
	.subscribe(val => {
	if (val === 'يوجد') {
	  this.drainageDataForTheBuildingForm.get('tankanalysis').setValidators([]);
	  this.tankanalysisIsVisible = true;
	  this.drainageDataForTheBuildingForm.get('tankAssembly').setValidators([]);
	  this.tankAssemblyIsVisible = true;
	  this.drainageDataForTheBuildingForm.get('candidate').setValidators([]);
	  this.candidateIsVisible = true;


	}
	this.drainageDataForTheBuildingForm.get('tankanalysis').updateValueAndValidity();
	this.drainageDataForTheBuildingForm.get('tankAssembly').updateValueAndValidity();
	this.drainageDataForTheBuildingForm.get('candidate').updateValueAndValidity();

	});
	this.drainageDataForTheBuildingForm.get('tankanalysis').valueChanges
	.subscribe(val => {
	if (val === 'يوجد') {
	  this.drainageDataForTheBuildingForm.get('length').setValidators([]);
	  this.lengthIsVisible = true;
	  this.drainageDataForTheBuildingForm.get('width').setValidators([]);
	  this.widthIsVisible = true;
	
	}else {
	  this.drainageDataForTheBuildingForm.get('length').clearValidators();
	  this.lengthIsVisible = false;





	}
	this.drainageDataForTheBuildingForm.get('length').updateValueAndValidity();
	this.drainageDataForTheBuildingForm.get('width').updateValueAndValidity();
	
	});
	this.drainageDataForTheBuildingForm.get('sanitationDitch').valueChanges
	.subscribe(val => {
	if (val === 'يوجد') {
	  this.drainageDataForTheBuildingForm.get('deep').setValidators([]);
	  this.deepIsVisible = true;
	 

	}
	this.drainageDataForTheBuildingForm.get('deep').updateValueAndValidity();
	
	});    

  }
  onSubmit() {
    this.drainageDataForTheBuildingService.create(this.drainageDataForTheBuildingForm.value)
        .pipe(switchMap(x => {
			return this.drainageDataForTheBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.drainageDataForTheBuildingForm.get(name);
    }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);

  }
 }
