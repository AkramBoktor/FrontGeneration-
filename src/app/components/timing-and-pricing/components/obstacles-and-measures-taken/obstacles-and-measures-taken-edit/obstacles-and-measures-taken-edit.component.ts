
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ObstaclesAndMeasuresTaken } from 'app/shared/models/obstacles-and-measures-taken';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ObstaclesAndMeasuresTakenService } from '../shared/obstacles-and-measures-taken.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-obstacles-and-measures-taken-edit',
  templateUrl: './obstacles-and-measures-taken-edit.component.html',
  styleUrls: ['./obstacles-and-measures-taken-edit.component.scss'],
  providers: []
})

export class ObstaclesAndMeasuresTakenEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedObstaclesAndMeasuresTaken: ObstaclesAndMeasuresTaken;
  obstaclesAndMeasuresTakenForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

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

  
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('referenceCode', { static: true }) ReferenceCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('executionCode', { static: true }) ExecutionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedObstaclesAndMeasuresTakenDialog: any,
    @Optional() public dialogRef: MatDialogRef<ObstaclesAndMeasuresTakenEditComponent>,
    public obstaclesAndMeasuresTakenService: ObstaclesAndMeasuresTakenService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedObstaclesAndMeasuresTaken = new ObstaclesAndMeasuresTaken();
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
      
  id : [this.selectedObstaclesAndMeasuresTaken.id],
  iD : [this.selectedObstaclesAndMeasuresTaken.iD, [ Validators.required ]],
  referencesCode : [this.selectedObstaclesAndMeasuresTaken.referencesCode, [ Validators.required ]],
  difficulties : [this.selectedObstaclesAndMeasuresTaken.difficulties, [ Validators.required ]],
  procedures : [this.selectedObstaclesAndMeasuresTaken.procedures, [ Validators.required ]],
  extensionCode : [this.selectedObstaclesAndMeasuresTaken.extensionCode, [ Validators.required ]],
  bidNumber : [this.selectedObstaclesAndMeasuresTaken.bidNumber, [ ]],
  contractorCode : [this.selectedObstaclesAndMeasuresTaken.contractorCode, [ ]],
  governorate : [this.selectedObstaclesAndMeasuresTaken.governorate, [ Validators.required ]],
  constructionType : [this.selectedObstaclesAndMeasuresTaken.constructionType, [ ]],
  offeringType : [this.selectedObstaclesAndMeasuresTaken.offeringType, [ Validators.required ]],
  referenceCode : [this.selectedObstaclesAndMeasuresTaken.referenceCode, [ ]],
  executionCode : [this.selectedObstaclesAndMeasuresTaken.executionCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.obstaclesAndMeasuresTakenService.update(this.obstaclesAndMeasuresTakenForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.obstaclesAndMeasuresTakenService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.obstaclesAndMeasuresTakenForm.get(name);
  }

  initializeLookupServices() {
    this.governoratesService = new LookupService('governorates', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.supportTypesService = new LookupService('supporttypes', this.http);
this.implementationPositionsService = new LookupService('implementationpositions', this.http);
  }
}
