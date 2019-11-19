
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DifferentFormAddedButNotExtracted } from 'app/shared/models/different-form-added-but-not-extracted';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DifferentFormAddedButNotExtractedService } from '../shared/different-form-added-but-not-extracted.service';

@Component({
  selector: 'app-different-form-added-but-not-extracted-view',
  templateUrl: './different-form-added-but-not-extracted-view.component.html',
  styleUrls: ['./different-form-added-but-not-extracted-view.component.scss'],
  providers: []
})

export class DifferentFormAddedButNotExtractedViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDifferentFormAddedButNotExtracted: DifferentFormAddedButNotExtracted;
  differentFormAddedButNotExtractedForm: FormGroup;

  private areasService: LookupService;
private departmentsSectionsService: LookupService;
private serialFormsService: LookupService;
private formSourcesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private offeringTypesService: LookupService;
private bankCodesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
administrationSelectOptions: MaterialSelectOptions;
serialFormSelectOptions: MaterialSelectOptions;
sourceFormSelectOptions: MaterialSelectOptions;
destinationTypeSelectOptions: MaterialSelectOptions;
destinationCodeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDifferentFormAddedButNotExtractedDialog: any,
    @Optional() public dialogRef: MatDialogRef<DifferentFormAddedButNotExtractedViewComponent>,
    public differentFormAddedButNotExtractedService: DifferentFormAddedButNotExtractedService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDifferentFormAddedButNotExtracted = this.selectedDifferentFormAddedButNotExtractedDialog.data || this.selectedDifferentFormAddedButNotExtracted;

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره',
	});

	this.serialFormSelectOptions = new MaterialSelectOptions({
	 data: this.serialFormsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مسلسل الاستماره',
	});

	this.sourceFormSelectOptions = new MaterialSelectOptions({
	 data: this.formSourcesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر الاستماره',
	});

	this.destinationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهه',
	});

	this.destinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهه',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});


    this.differentFormAddedButNotExtractedForm = this.formBuilder.group({
      
  dateForm : [this.selectedDifferentFormAddedButNotExtracted.dateForm],
  formAmount : [this.selectedDifferentFormAddedButNotExtracted.formAmount],
  buildingCode : [this.selectedDifferentFormAddedButNotExtracted.buildingCode],
  bidNumber : [this.selectedDifferentFormAddedButNotExtracted.bidNumber],
  accountNumber : [this.selectedDifferentFormAddedButNotExtracted.accountNumber],
  statement : [this.selectedDifferentFormAddedButNotExtracted.statement],
  region : [this.selectedDifferentFormAddedButNotExtracted.region],
  administration : [this.selectedDifferentFormAddedButNotExtracted.administration],
  serialForm : [this.selectedDifferentFormAddedButNotExtracted.serialForm],
  sourceForm : [this.selectedDifferentFormAddedButNotExtracted.sourceForm],
  destinationType : [this.selectedDifferentFormAddedButNotExtracted.destinationType],
  destinationCode : [this.selectedDifferentFormAddedButNotExtracted.destinationCode],
  offeringType : [this.selectedDifferentFormAddedButNotExtracted.offeringType],
  bankCode : [this.selectedDifferentFormAddedButNotExtracted.bankCode]
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
    return this.differentFormAddedButNotExtractedForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.differentFormAddedButNotExtractedForm.controls)) {
      this.differentFormAddedButNotExtractedForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.serialFormsService = new LookupService('serialforms', this.http);
this.formSourcesService = new LookupService('formsources', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

