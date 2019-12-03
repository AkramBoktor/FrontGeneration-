
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixture } from 'app/shared/models/conformations-and-the-result-of-the-corresponding-concrete-mixture';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService } from '../shared/conformations-and-the-result-of-the-corresponding-concrete-mixture.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-conformations-and-the-result-of-the-corresponding-concrete-mixture-new',
  templateUrl: './conformations-and-the-result-of-the-corresponding-concrete-mixture-new.component.html',
  styleUrls: ['./conformations-and-the-result-of-the-corresponding-concrete-mixture-new.component.scss'],
  providers: [
    ]
})

export class ConformationsAndTheResultOfTheCorrespondingConcreteMixtureNewComponent extends AppBaseComponent implements OnInit {
  conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm: FormGroup;
  @Input() selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture: ConformationsAndTheResultOfTheCorrespondingConcreteMixture;
  errorMessages: FormControlError[] = [
        
  ];

  private laboratoriesService: LookupService;
private measurementUnitsService: LookupService;
private statementTypesService: LookupService;
private yesOrNoService: LookupService;

  
laboratorySelectOptions: MaterialSelectOptions;
measruingUnitSelectOptions: MaterialSelectOptions;
statementTypeSelectOptions: MaterialSelectOptions;
sampleMatchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratory', { static: true }) LaboratorySelectComponent: MaterialSelectComponent;
	@ViewChild('measruingUnit', { static: true }) MeasruingUnitSelectComponent: MaterialSelectComponent;
	@ViewChild('statementType', { static: true }) StatementTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('sampleMatch', { static: true }) SampleMatchSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ConformationsAndTheResultOfTheCorrespondingConcreteMixtureNewComponent>,
    public conformationsAndTheResultOfTheCorrespondingConcreteMixtureService: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture = new ConformationsAndTheResultOfTheCorrespondingConcreteMixture();

    
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
     
  id : [0],
  orderNumber : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.orderNumber, [ Validators.required ]],
  sampleSpecificationCode : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.sampleSpecificationCode, [ Validators.required ]],
  basicArticle : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.basicArticle, [ Validators.required ]],
  subArticle : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.subArticle, [ Validators.required ]],
  calledTesting : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.calledTesting, [ ]],
  serialSample : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.serialSample, [ Validators.required ]],
  sampleTestDate : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.sampleTestDate, [ Validators.required ]],
  laboratoryEngineer : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.laboratoryEngineer, [ Validators.required ]],
  testStatementCode : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.testStatementCode, [ Validators.required ]],
  statementTestName : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.statementTestName, [ Validators.required ]],
  statementResult : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.statementResult, [ Validators.required ]],
  age : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.age, [ ]],
  newSampleOrderNumber : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.newSampleOrderNumber, [ Validators.required ]],
  entry : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.entry, [ Validators.required ]],
  testResult : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.testResult, [ ]],
  laboratory : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.laboratory, [ Validators.required ]],
  measruingUnit : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.measruingUnit, [ Validators.required ]],
  statementType : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.statementType, [ Validators.required ]],
  sampleMatch : [this.selectedConformationsAndTheResultOfTheCorrespondingConcreteMixture.sampleMatch, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureService.create(this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm.value)
        .pipe(switchMap(x => {
			return this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.conformationsAndTheResultOfTheCorrespondingConcreteMixtureForm.get(name);
    }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
this.statementTypesService = new LookupService('statementtypes', this.http);
this.yesOrNoService = new LookupService('yesOrNos', this.http);
  }
 }
