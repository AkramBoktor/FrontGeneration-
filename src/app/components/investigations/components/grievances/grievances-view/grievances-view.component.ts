
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Grievances } from 'app/shared/models/grievances';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GrievancesService } from '../shared/grievances.service';

@Component({
  selector: 'app-grievances-view',
  templateUrl: './grievances-view.component.html',
  styleUrls: ['./grievances-view.component.scss'],
  providers: []
})

export class GrievancesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGrievances: Grievances;
  grievancesForm: FormGroup;

  private departmentsSectionsService: LookupService;
private branchCodesService: LookupService;
private commissionChairmanDecisionsService: LookupService;
private sanctionsAndTheirCausesService: LookupService;

  
grievanceDestinationCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
decisionChairmanCommissionSelectOptions: MaterialSelectOptions;
penaltyAfterAmendmentSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGrievancesDialog: any,
    @Optional() public dialogRef: MatDialogRef<GrievancesViewComponent>,
    public grievancesService: GrievancesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGrievances = this.selectedGrievancesDialog.data || this.selectedGrievances;

    
	this.grievanceDestinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهة التظلم',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.decisionChairmanCommissionSelectOptions = new MaterialSelectOptions({
	 data: this.commissionChairmanDecisionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  قرار رئيس الهيئة',
	});

	this.penaltyAfterAmendmentSelectOptions = new MaterialSelectOptions({
	 data: this.sanctionsAndTheirCausesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجزاء بعد التعديل',
	});


    this.grievancesForm = this.formBuilder.group({
      
  fileNumber : [this.selectedGrievances.fileNumber],
  employeeCode : [this.selectedGrievances.employeeCode],
  investigationFileNumber : [this.selectedGrievances.investigationFileNumber],
  executiveOrderNumber : [this.selectedGrievances.executiveOrderNumber],
  issuanceExecutiveOrderDate : [this.selectedGrievances.issuanceExecutiveOrderDate],
  grievanceSubject : [this.selectedGrievances.grievanceSubject],
  executiveOrderNewNo : [this.selectedGrievances.executiveOrderNewNo],
  executiveOrderNewDate : [this.selectedGrievances.executiveOrderNewDate],
  containedArchiveDate : [this.selectedGrievances.containedArchiveDate],
  incomingNumber : [this.selectedGrievances.incomingNumber],
  receivedDate : [this.selectedGrievances.receivedDate],
  lawyerCode : [this.selectedGrievances.lawyerCode],
  referralDate : [this.selectedGrievances.referralDate],
  grievanceSearchHistory : [this.selectedGrievances.grievanceSearchHistory],
  grievanceSearchResult : [this.selectedGrievances.grievanceSearchResult],
  presentationChairmanCommissionDate : [this.selectedGrievances.presentationChairmanCommissionDate],
  chairmanDecisionDate : [this.selectedGrievances.chairmanDecisionDate],
  notificationAffairsDate : [this.selectedGrievances.notificationAffairsDate],
  complainantDateNotification : [this.selectedGrievances.complainantDateNotification],
  savedTopicDate : [this.selectedGrievances.savedTopicDate],
  grievanceDestinationCode : [this.selectedGrievances.grievanceDestinationCode],
  branchCode : [this.selectedGrievances.branchCode],
  decisionChairmanCommission : [this.selectedGrievances.decisionChairmanCommission],
  penaltyAfterAmendment : [this.selectedGrievances.penaltyAfterAmendment]
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
    return this.grievancesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.grievancesForm.controls)) {
      this.grievancesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.commissionChairmanDecisionsService = new LookupService('commissionchairmandecisions', this.http);
this.sanctionsAndTheirCausesService = new LookupService('sanctionsandtheircauses', this.http);
  }
}

