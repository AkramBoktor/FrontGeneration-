
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ObstaclesAndMeasuresTaken } from 'app/shared/models/obstacles-and-measures-taken';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ObstaclesAndMeasuresTakenService } from '../shared/obstacles-and-measures-taken.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-obstacles-and-measures-taken-view',
  templateUrl: './obstacles-and-measures-taken-view.component.html',
  styleUrls: ['./obstacles-and-measures-taken-view.component.scss'],
  providers: []
})

export class ObstaclesAndMeasuresTakenViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedObstaclesAndMeasuresTaken: ObstaclesAndMeasuresTaken;
  obstaclesAndMeasuresTakenForm: FormGroup;

  private governoratesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private supportTypesService: LookupService;
private implementationPositionsService: LookupService;

  
governorateSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
referenceCodeSelectOptions: MaterialSelectOptions;
executionCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedObstaclesAndMeasuresTakenDialog: any,
    @Optional() public dialogRef: MatDialogRef<ObstaclesAndMeasuresTakenViewComponent>,
    public obstaclesAndMeasuresTakenService: ObstaclesAndMeasuresTakenService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedObstaclesAndMeasuresTaken = this.selectedObstaclesAndMeasuresTakenDialog.data || this.selectedObstaclesAndMeasuresTaken;

    
	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.referenceCodeSelectOptions = new MaterialSelectOptions({
	 data: this.supportTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الاسناد',
	});

	this.executionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.implementationPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التنفيذ',
	});


    this.obstaclesAndMeasuresTakenForm = this.formBuilder.group({
      
  iDNumber : [this.selectedObstaclesAndMeasuresTaken.iDNumber],
  referencesCode : [this.selectedObstaclesAndMeasuresTaken.referencesCode],
  difficulties : [this.selectedObstaclesAndMeasuresTaken.difficulties],
  procedures : [this.selectedObstaclesAndMeasuresTaken.procedures],
  extensionCode : [this.selectedObstaclesAndMeasuresTaken.extensionCode],
  bidNumber : [this.selectedObstaclesAndMeasuresTaken.bidNumber],
  contractorCode : [this.selectedObstaclesAndMeasuresTaken.contractorCode],
  governorate : [this.selectedObstaclesAndMeasuresTaken.governorate],
  constructionType : [this.selectedObstaclesAndMeasuresTaken.constructionType],
  offeringType : [this.selectedObstaclesAndMeasuresTaken.offeringType],
  referenceCode : [this.selectedObstaclesAndMeasuresTaken.referenceCode],
  executionCode : [this.selectedObstaclesAndMeasuresTaken.executionCode]
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
    return this.obstaclesAndMeasuresTakenForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.obstaclesAndMeasuresTakenForm.controls)) {
      this.obstaclesAndMeasuresTakenForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.supportTypesService = new LookupService('supporttypes', this.http);
this.implementationPositionsService = new LookupService('implementationpositions', this.http);
  }
}

