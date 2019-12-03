
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DifferentFormNotExtracted } from 'app/shared/models/different-form-not-extracted';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DifferentFormNotExtractedService } from '../shared/different-form-not-extracted.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-different-form-not-extracted-view',
  templateUrl: './different-form-not-extracted-view.component.html',
  styleUrls: ['./different-form-not-extracted-view.component.scss'],
  providers: []
})

export class DifferentFormNotExtractedViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDifferentFormNotExtracted: DifferentFormNotExtracted;
  differentFormNotExtractedForm: FormGroup;

  private areasService: LookupService;
private centralDepartmentsService: LookupService;
private formSourcesService: LookupService;
private entityTypesService: LookupService;
private entityCodesService: LookupService;
private offeringTypesService: LookupService;
private bankCodesService: LookupService;

  
regionSelectOptions: MaterialSelectOptions;
administrationSelectOptions: MaterialSelectOptions;
formSourceSelectOptions: MaterialSelectOptions;
destinationTypeSelectOptions: MaterialSelectOptions;
destinationCodeSelectOptions: MaterialSelectOptions;
subtractionTypeSelectOptions: MaterialSelectOptions;
bankCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDifferentFormNotExtractedDialog: any,
    @Optional() public dialogRef: MatDialogRef<DifferentFormNotExtractedViewComponent>,
    public differentFormNotExtractedService: DifferentFormNotExtractedService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDifferentFormNotExtracted = this.selectedDifferentFormNotExtractedDialog.data || this.selectedDifferentFormNotExtracted;

    
	this.regionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المنطقه',
	});

	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.centralDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره',
	});

	this.formSourceSelectOptions = new MaterialSelectOptions({
	 data: this.formSourcesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر الاستماره',
	});

	this.destinationTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهه',
	});

	this.destinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهه',
	});

	this.subtractionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.bankCodeSelectOptions = new MaterialSelectOptions({
	 data: this.bankCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البنك',
	});


    this.differentFormNotExtractedForm = this.formBuilder.group({
      
  dateForm : [this.selectedDifferentFormNotExtracted.dateForm],
  formNumber : [this.selectedDifferentFormNotExtracted.formNumber],
  formPrice : [this.selectedDifferentFormNotExtracted.formPrice],
  buildingCode : [this.selectedDifferentFormNotExtracted.buildingCode],
  bidNumber : [this.selectedDifferentFormNotExtracted.bidNumber],
  accountNumber : [this.selectedDifferentFormNotExtracted.accountNumber],
  statement : [this.selectedDifferentFormNotExtracted.statement],
  region : [this.selectedDifferentFormNotExtracted.region],
  administration : [this.selectedDifferentFormNotExtracted.administration],
  formSource : [this.selectedDifferentFormNotExtracted.formSource],
  destinationType : [this.selectedDifferentFormNotExtracted.destinationType],
  destinationCode : [this.selectedDifferentFormNotExtracted.destinationCode],
  subtractionType : [this.selectedDifferentFormNotExtracted.subtractionType],
  bankCode : [this.selectedDifferentFormNotExtracted.bankCode]
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
    return this.differentFormNotExtractedForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.differentFormNotExtractedForm.controls)) {
      this.differentFormNotExtractedForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.centralDepartmentsService = new LookupService('centraldepartments', this.http);
this.formSourcesService = new LookupService('formsources', this.http);
this.entityTypesService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.bankCodesService = new LookupService('bankcodes', this.http);
  }
}

