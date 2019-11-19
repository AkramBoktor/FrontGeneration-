
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DifferentFormAddedButNotExtracted } from 'app/shared/models/different-form-added-but-not-extracted';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { DifferentFormAddedButNotExtractedService } from '../shared/different-form-added-but-not-extracted.service';




@Component({
  selector: 'app-different-form-added-but-not-extracted-edit',
  templateUrl: './different-form-added-but-not-extracted-edit.component.html',
  styleUrls: ['./different-form-added-but-not-extracted-edit.component.scss'],
  providers: []
})

export class DifferentFormAddedButNotExtractedEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDifferentFormAddedButNotExtracted: DifferentFormAddedButNotExtracted;
  differentFormAddedButNotExtractedForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

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

  
	@ViewChild('region', { static: true }) RegionSelectComponent: MaterialSelectComponent;
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('serialForm', { static: true }) SerialFormSelectComponent: MaterialSelectComponent;
	@ViewChild('sourceForm', { static: true }) SourceFormSelectComponent: MaterialSelectComponent;
	@ViewChild('destinationType', { static: true }) DestinationTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('destinationCode', { static: true }) DestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('bankCode', { static: true }) BankCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDifferentFormAddedButNotExtractedDialog: any,
    @Optional() public dialogRef: MatDialogRef<DifferentFormAddedButNotExtractedEditComponent>,
    public differentFormAddedButNotExtractedService: DifferentFormAddedButNotExtractedService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDifferentFormAddedButNotExtracted = new DifferentFormAddedButNotExtracted();
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
      
  id : [this.selectedDifferentFormAddedButNotExtracted.id],
  dateForm : [this.selectedDifferentFormAddedButNotExtracted.dateForm, [ Validators.required ]],
  formAmount : [this.selectedDifferentFormAddedButNotExtracted.formAmount, [ Validators.required ]],
  buildingCode : [this.selectedDifferentFormAddedButNotExtracted.buildingCode, [ Validators.required ]],
  bidNumber : [this.selectedDifferentFormAddedButNotExtracted.bidNumber, [ Validators.required ]],
  accountNumber : [this.selectedDifferentFormAddedButNotExtracted.accountNumber, [ Validators.required ]],
  statement : [this.selectedDifferentFormAddedButNotExtracted.statement, [ Validators.required ]],
  region : [this.selectedDifferentFormAddedButNotExtracted.region, [ Validators.required ]],
  administration : [this.selectedDifferentFormAddedButNotExtracted.administration, [ Validators.required ]],
  serialForm : [this.selectedDifferentFormAddedButNotExtracted.serialForm, [ Validators.required ]],
  sourceForm : [this.selectedDifferentFormAddedButNotExtracted.sourceForm, [ Validators.required ]],
  destinationType : [this.selectedDifferentFormAddedButNotExtracted.destinationType, [ Validators.required ]],
  destinationCode : [this.selectedDifferentFormAddedButNotExtracted.destinationCode, [ Validators.required ]],
  offeringType : [this.selectedDifferentFormAddedButNotExtracted.offeringType, [ Validators.required ]],
  bankCode : [this.selectedDifferentFormAddedButNotExtracted.bankCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.differentFormAddedButNotExtractedService.update(this.differentFormAddedButNotExtractedForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.differentFormAddedButNotExtractedService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.differentFormAddedButNotExtractedForm.get(name);
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
