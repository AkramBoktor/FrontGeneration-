
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DifferentFormNotExtracted } from 'app/shared/models/different-form-not-extracted';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DifferentFormNotExtractedService } from '../shared/different-form-not-extracted.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-different-form-not-extracted-new',
  templateUrl: './different-form-not-extracted-new.component.html',
  styleUrls: ['./different-form-not-extracted-new.component.scss'],
  providers: [
    ]
})

export class DifferentFormNotExtractedNewComponent extends AppBaseComponent implements OnInit {
  differentFormNotExtractedForm: FormGroup;
  @Input() selectedDifferentFormNotExtracted: DifferentFormNotExtracted;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('formSource', { static: true }) FormSourceSelectComponent: MaterialSelectComponent;
	@ViewChild('destinationType', { static: true }) DestinationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('destinationCode', { static: true }) DestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('subtractionType', { static: true }) SubtractionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DifferentFormNotExtractedNewComponent>,
    public differentFormNotExtractedService: DifferentFormNotExtractedService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDifferentFormNotExtracted = new DifferentFormNotExtracted();

    
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
     
  id : [0],
  dateForm : [this.selectedDifferentFormNotExtracted.dateForm, [ Validators.required ]],
  formNumber : [this.selectedDifferentFormNotExtracted.formNumber, [ Validators.required ]],
  formPrice : [this.selectedDifferentFormNotExtracted.formPrice, [ Validators.required ]],
  buildingCode : [this.selectedDifferentFormNotExtracted.buildingCode, [ Validators.required ]],
  bidNumber : [this.selectedDifferentFormNotExtracted.bidNumber, [ Validators.required ]],
  accountNumber : [this.selectedDifferentFormNotExtracted.accountNumber, [ Validators.required ]],
  statement : [this.selectedDifferentFormNotExtracted.statement, [ Validators.required ]],
  region : [this.selectedDifferentFormNotExtracted.region, [ Validators.required ]],
  administration : [this.selectedDifferentFormNotExtracted.administration, [ Validators.required ]],
  formSource : [this.selectedDifferentFormNotExtracted.formSource, [ Validators.required ]],
  destinationType : [this.selectedDifferentFormNotExtracted.destinationType, [ Validators.required ]],
  destinationCode : [this.selectedDifferentFormNotExtracted.destinationCode, [ Validators.required ]],
  subtractionType : [this.selectedDifferentFormNotExtracted.subtractionType, [ Validators.required ]],
  bankCode : [this.selectedDifferentFormNotExtracted.bankCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.differentFormNotExtractedService.create(this.differentFormNotExtractedForm.value)
        .pipe(switchMap(x => {
			return this.differentFormNotExtractedService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.differentFormNotExtractedForm.get(name);
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
