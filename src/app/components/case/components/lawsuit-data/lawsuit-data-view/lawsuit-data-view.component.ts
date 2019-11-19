
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LawsuitData } from 'app/shared/models/lawsuit-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LawsuitDataService } from '../shared/lawsuit-data.service';

@Component({
  selector: 'app-lawsuit-data-view',
  templateUrl: './lawsuit-data-view.component.html',
  styleUrls: ['./lawsuit-data-view.component.scss'],
  providers: []
})

export class LawsuitDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLawsuitData: LawsuitData;
  lawsuitDataForm: FormGroup;

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private bodyAttributesService: LookupService;
private advocacyPositionsService: LookupService;
private issueCodeIssuesService: LookupService;
private courtCodesService: LookupService;
private circuitCodesService: LookupService;
private litigationDegreesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
lawsuitPositionSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;
courtCodeSelectOptions: MaterialSelectOptions;
chamberTypeSelectOptions: MaterialSelectOptions;
litigationDegreeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLawsuitDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<LawsuitDataViewComponent>,
    public lawsuitDataService: LawsuitDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLawsuitData = this.selectedLawsuitDataDialog.data || this.selectedLawsuitData;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});

	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة',
	});

	this.whoIsSelectOptions = new MaterialSelectOptions({
	 data: this.bodyAttributesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة الهيئة',
	});

	this.lawsuitPositionSelectOptions = new MaterialSelectOptions({
	 data: this.advocacyPositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الدعوي',
	});

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});

	this.courtCodeSelectOptions = new MaterialSelectOptions({
	 data: this.courtCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحكمة',
	});

	this.chamberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.circuitCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الدائره',
	});

	this.litigationDegreeSelectOptions = new MaterialSelectOptions({
	 data: this.litigationDegreesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'درجة التقاضي',
	});


    this.lawsuitDataForm = this.formBuilder.group({
      
  fileNumber : [this.selectedLawsuitData.fileNumber],
  lawsuitNumber : [this.selectedLawsuitData.lawsuitNumber],
  year : [this.selectedLawsuitData.year],
  employeeCode : [this.selectedLawsuitData.employeeCode],
  lawyerReceiptDate : [this.selectedLawsuitData.lawyerReceiptDate],
  incomingDate : [this.selectedLawsuitData.incomingDate],
  firstSessionDate : [this.selectedLawsuitData.firstSessionDate],
  branchCode : [this.selectedLawsuitData.branchCode],
  entityType : [this.selectedLawsuitData.entityType],
  entityCode : [this.selectedLawsuitData.entityCode],
  whoIs : [this.selectedLawsuitData.whoIs],
  lawsuitPosition : [this.selectedLawsuitData.lawsuitPosition],
  issueCode : [this.selectedLawsuitData.issueCode],
  courtCode : [this.selectedLawsuitData.courtCode],
  chamberType : [this.selectedLawsuitData.chamberType],
  litigationDegree : [this.selectedLawsuitData.litigationDegree]
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
    return this.lawsuitDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.lawsuitDataForm.controls)) {
      this.lawsuitDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.advocacyPositionsService = new LookupService('advocacypositions', this.http);
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.circuitCodesService = new LookupService('circuitcodes', this.http);
this.litigationDegreesService = new LookupService('litigationdegrees', this.http);
  }
}

