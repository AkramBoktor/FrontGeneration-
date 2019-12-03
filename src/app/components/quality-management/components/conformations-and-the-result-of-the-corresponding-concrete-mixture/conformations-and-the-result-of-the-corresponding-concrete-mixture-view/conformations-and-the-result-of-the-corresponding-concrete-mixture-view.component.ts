
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixture } from 'app/shared/models/conformations-and-the-result-of-the-corresponding-concrete-mixture';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService } from '../shared/conformations-and-the-result-of-the-corresponding-concrete-mixture.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-conformations-and-the-result-of-the-corresponding-concrete-mixture-view',
  templateUrl: './conformations-and-the-result-of-the-corresponding-concrete-mixture-view.component.html',
  styleUrls: ['./conformations-and-the-result-of-the-corresponding-concrete-mixture-view.component.scss'],
  providers: []
})

export class ConformationsAndTheResultOfTheCorrespondingConcreteMixtureViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture: ConformationsAndTheResultOfTheCorrespondingConcreteMixture;
  conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm: FormGroup;

  private laboratoriesService: LookupService;
private measurementUnitsService: LookupService;
private statementTypesService: LookupService;
private yesOrNoService: LookupService;

  
laboratorySelectOptions: MaterialSelectOptions;
measruingUnitSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;
sampleMatchSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedConformationsAndTheResultOfTheCorrespondingConcreteMixtureDialog: any,
    @Optional() public dialogRef: MatDialogRef<ConformationsAndTheResultOfTheCorrespondingConcreteMixtureViewComponent>,
    public conformationsAndTheResultOfTheCorrespondingConcreteMixtureService: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture = this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixtureDialog.data || this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture;

    
	this.laboratorySelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المعمل',
	});

	this.measruingUnitSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وحدة القياس',
	});

	this.statementTypeSelectOptions = new MaterialSelectOptions({
	 data: this.statementTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع البيان',
	});

	this.sampleMatchSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNoService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مطابقة العينة',
	});


    this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm = this.formBuilder.group({
      
  orderNumber : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.orderNumber],
  sampleSpecificationCode : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.sampleSpecificationCode],
  basicArticle : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.basicArticle],
  subArticle : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.subArticle],
  calledTesting : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.calledTesting],
  serialSample : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.serialSample],
  sampleTestDate : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.sampleTestDate],
  laboratoryEngineer : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.laboratoryEngineer],
  testStatementCode : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.testStatementCode],
  statementTestName : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.statementTestName],
  statementResult : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.statementResult],
  age : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.age],
  newSampleOrderNumber : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.newSampleOrderNumber],
  entry : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.entry],
  testResult : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.testResult],
  laboratory : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.laboratory],
  measruingUnit : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.measruingUnit],
  statementType : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.statementType],
  sampleMatch : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.sampleMatch]
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
    return this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm.controls)) {
      this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
  }
}

