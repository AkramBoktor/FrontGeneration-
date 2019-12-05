
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixture } from 'app/shared/models/conformations-and-the-result-of-the-corresponding-concrete-mixture';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService } from '../shared/conformations-and-the-result-of-the-corresponding-concrete-mixture.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-conformations-and-the-result-of-the-corresponding-concrete-mixture-edit',
  templateUrl: './conformations-and-the-result-of-the-corresponding-concrete-mixture-edit.component.html',
  styleUrls: ['./conformations-and-the-result-of-the-corresponding-concrete-mixture-edit.component.scss'],
  providers: []
})

export class ConformationsAndTheResultOfTheCorrespondingConcreteMixtureEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture: ConformationsAndTheResultOfTheCorrespondingConcreteMixture;
  conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private yesOrNoService: LookupService;
private statementTypesService: LookupService;
private measurementUnitsService: LookupService;
private laboratoriesService: LookupService;

  
sampleMatchSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;
measruingUnitSelectOptions: MaterialSelectOptions;
laboratorySelectOptions: MaterialSelectOptions;

  
	@ViewChild('sampleMatch', { static: true }) SampleMatchSelectComponent: MaterialSelectComponent;
	@ViewChild('statementType', { static: true }) StatementTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('measruingUnit', { static: true }) MeasruingUnitSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratory', { static: true }) LaboratorySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedConformationsAndTheResultOfTheCorrespondingConcreteMixtureDialog: any,
    @Optional() public dialogRef: MatDialogRef<ConformationsAndTheResultOfTheCorrespondingConcreteMixtureEditComponent>,
    public conformationsAndTheResultOfTheCorrespondingConcreteMixtureService: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture = new ConformationsAndTheResultOfTheCorrespondingConcreteMixture();
    this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture = this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixtureDialog.data || this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture;

    
	this.sampleMatchSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNoService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مطابقة العينة',
	});

	this.statementTypeSelectOptions = new MaterialSelectOptions({
	 data: this.statementTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع البيان',
	});

	this.measruingUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحدة القياس',
	});

	this.laboratorySelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المعمل',
	});


    this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm = this.formBuilder.group({
      
  id : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.id],
  orderNumber : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.orderNumber, [ Validators.required ]],
  newSampleOrderNumber : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.newSampleOrderNumber, [ Validators.required ]],
  age : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.age, [ ]],
  statementResult : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.statementResult, [ Validators.required ]],
  statementTestName : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.statementTestName, [ Validators.required ]],
  entry : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.entry, [ Validators.required ]],
  testStatementCode : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.testStatementCode, [ Validators.required ]],
  laboratoryEngineer : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.laboratoryEngineer, [ Validators.required ]],
  sampleTestDate : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.sampleTestDate, [ Validators.required ]],
  serialSample : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.serialSample, [ Validators.required ]],
  calledTesting : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.calledTesting, [ ]],
  subArticle : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.subArticle, [ Validators.required ]],
  basicArticle : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.basicArticle, [ Validators.required ]],
  sampleSpecificationCode : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.sampleSpecificationCode, [ Validators.required ]],
  testResult : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.testResult, [ ]],
  sampleMatch : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.sampleMatch, [ Validators.required ]],
  statementType : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.statementType, [ Validators.required ]],
  measruingUnit : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.measruingUnit, [ Validators.required ]],
  laboratory : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.laboratory, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureService.update(this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm.get(name);
  }

  initializeLookupServices() {
    this.yesOrNoService = new LookupService('yesOrNos', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.laboratoriesService = new LookupService('laboratories', this.http);
  }
}
