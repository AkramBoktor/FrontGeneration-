
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LawsuitSessionsArbitration } from 'app/shared/models/lawsuit-sessions-arbitration';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LawsuitSessionsArbitrationService } from '../shared/lawsuit-sessions-arbitration.service';

@Component({
  selector: 'app-lawsuit-sessions-arbitration-view',
  templateUrl: './lawsuit-sessions-arbitration-view.component.html',
  styleUrls: ['./lawsuit-sessions-arbitration-view.component.scss'],
  providers: []
})

export class LawsuitSessionsArbitrationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLawsuitSessionsArbitration: LawsuitSessionsArbitration;
  lawsuitSessionsArbitrationForm: FormGroup;

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private courtCodesService: LookupService;
private bodyAttributesService: LookupService;
private arbitrationClassificationsService: LookupService;
private discountTypesService: LookupService;
private discountCodesService: LookupService;
private arbitrationTopicCodesService: LookupService;
private arbitratorsService: LookupService;
private technicalMembersService: LookupService;
private legalMemberService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
arbitrationCodeSelectOptions: MaterialSelectOptions;
whoIsSelectOptions: MaterialSelectOptions;
arbitrationClassificationSelectOptions: MaterialSelectOptions;
discountTypeSelectOptions: MaterialSelectOptions;
codeSelectOptions: MaterialSelectOptions;
arbitrationTextSelectOptions: MaterialSelectOptions;
arbitratorSelectOptions: MaterialSelectOptions;
technicalMemberSelectOptions: MaterialSelectOptions;
legalMemberSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLawsuitSessionsArbitrationDialog: any,
    @Optional() public dialogRef: MatDialogRef<LawsuitSessionsArbitrationViewComponent>,
    public lawsuitSessionsArbitrationService: LawsuitSessionsArbitrationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLawsuitSessionsArbitration = this.selectedLawsuitSessionsArbitrationDialog.data || this.selectedLawsuitSessionsArbitration;

    
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

	this.arbitrationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.courtCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهة التحكيم',
	});

	this.whoIsSelectOptions = new MaterialSelectOptions({
	 data: this.bodyAttributesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'صفة الهيئة',
	});

	this.arbitrationClassificationSelectOptions = new MaterialSelectOptions({
	 data: this.arbitrationClassificationsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تصنيف التحكيم',
	});

	this.discountTypeSelectOptions = new MaterialSelectOptions({
	 data: this.discountTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخصم',
	});

	this.codeSelectOptions = new MaterialSelectOptions({
	 data: this.discountCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الخصم',
	});

	this.arbitrationTextSelectOptions = new MaterialSelectOptions({
	 data: this.arbitrationTopicCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موضوع التحكيم',
	});

	this.arbitratorSelectOptions = new MaterialSelectOptions({
	 data: this.arbitratorsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحكم',
	});

	this.technicalMemberSelectOptions = new MaterialSelectOptions({
	 data: this.technicalMembersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العضو الفني',
	});

	this.legalMemberSelectOptions = new MaterialSelectOptions({
	 data: this.legalMemberService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العضو القانوني',
	});


    this.lawsuitSessionsArbitrationForm = this.formBuilder.group({
      
  fileNumber : [this.selectedLawsuitSessionsArbitration.fileNumber],
  arbitrationNumber : [this.selectedLawsuitSessionsArbitration.arbitrationNumber],
  year : [this.selectedLawsuitSessionsArbitration.year],
  sessionDate : [this.selectedLawsuitSessionsArbitration.sessionDate],
  branchCode : [this.selectedLawsuitSessionsArbitration.branchCode],
  entityType : [this.selectedLawsuitSessionsArbitration.entityType],
  arbitrationCode : [this.selectedLawsuitSessionsArbitration.arbitrationCode],
  whoIs : [this.selectedLawsuitSessionsArbitration.whoIs],
  arbitrationClassification : [this.selectedLawsuitSessionsArbitration.arbitrationClassification],
  discountType : [this.selectedLawsuitSessionsArbitration.discountType],
  code : [this.selectedLawsuitSessionsArbitration.code],
  arbitrationText : [this.selectedLawsuitSessionsArbitration.arbitrationText],
  arbitrator : [this.selectedLawsuitSessionsArbitration.arbitrator],
  technicalMember : [this.selectedLawsuitSessionsArbitration.technicalMember],
  legalMember : [this.selectedLawsuitSessionsArbitration.legalMember]
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
    return this.lawsuitSessionsArbitrationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.lawsuitSessionsArbitrationForm.controls)) {
      this.lawsuitSessionsArbitrationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.bodyAttributesService = new LookupService('bodyattributes', this.http);
this.arbitrationClassificationsService = new LookupService('arbitrationclassifications', this.http);
this.discountTypesService = new LookupService('discounttypes', this.http);
this.discountCodesService = new LookupService('discountcodes', this.http);
this.arbitrationTopicCodesService = new LookupService('arbitrationtopiccodes', this.http);
this.arbitratorsService = new LookupService('arbitrators', this.http);
this.technicalMembersService = new LookupService('technicalmembers', this.http);
this.legalMemberService = new LookupService('legalmembers', this.http);
  }
}

