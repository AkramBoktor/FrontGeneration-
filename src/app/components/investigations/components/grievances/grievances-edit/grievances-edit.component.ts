
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Grievances } from 'app/shared/models/grievances';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { GrievancesService } from '../shared/grievances.service';




@Component({
  selector: 'app-grievances-edit',
  templateUrl: './grievances-edit.component.html',
  styleUrls: ['./grievances-edit.component.scss'],
  providers: []
})

export class GrievancesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGrievances: Grievances;
  grievancesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private sanctionsAndTheirCausesService: LookupService;
private commissionChairmanDecisionsService: LookupService;
private branchCodesService: LookupService;
private departmentsSectionsService: LookupService;

  
penaltyAfterAmendmentSelectOptions: MaterialSelectOptions;
decisionChairmanCommissionSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
grievanceDestinationCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('penaltyAfterAmendment', { static: true }) PenaltyAfterAmendmentSelectComponent: MaterialSelectComponent;
	@ViewChild('decisionChairmanCommission', { static: true }) DecisionChairmanCommissionSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('grievanceDestinationCode', { static: true }) GrievanceDestinationCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGrievancesDialog: any,
    @Optional() public dialogRef: MatDialogRef<GrievancesEditComponent>,
    public grievancesService: GrievancesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGrievances = new Grievances();
    this.selectedGrievances = this.selectedGrievancesDialog.data || this.selectedGrievances;

    
	this.penaltyAfterAmendmentSelectOptions = new MaterialSelectOptions({
	 data: this.sanctionsAndTheirCausesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجزاء بعد التعديل',
	});

	this.decisionChairmanCommissionSelectOptions = new MaterialSelectOptions({
	 data: this.commissionChairmanDecisionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: '  قرار رئيس الهيئة',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.grievanceDestinationCodeSelectOptions = new MaterialSelectOptions({
	 data: this.departmentsSectionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود جهة التظلم',
	});


    this.grievancesForm = this.formBuilder.group({
      
  id : [this.selectedGrievances.id],
  fileNumber : [this.selectedGrievances.fileNumber, [ Validators.required ]],
  notificationAffairsDate : [this.selectedGrievances.notificationAffairsDate, [ ]],
  chairmanDecisionDate : [this.selectedGrievances.chairmanDecisionDate, [ Validators.required ]],
  presentationChairmanCommissionDate : [this.selectedGrievances.presentationChairmanCommissionDate, [ Validators.required ]],
  grievanceSearchResult : [this.selectedGrievances.grievanceSearchResult, [ Validators.required ]],
  grievanceSearchHistory : [this.selectedGrievances.grievanceSearchHistory, [ Validators.required ]],
  referralDate : [this.selectedGrievances.referralDate, [ Validators.required ]],
  lawyerCode : [this.selectedGrievances.lawyerCode, [ Validators.required ]],
  receivedDate : [this.selectedGrievances.receivedDate, [ Validators.required ]],
  incomingNumber : [this.selectedGrievances.incomingNumber, [ Validators.required ]],
  containedArchiveDate : [this.selectedGrievances.containedArchiveDate, [ Validators.required ]],
  executiveOrderNewDate : [this.selectedGrievances.executiveOrderNewDate, [ Validators.required ]],
  executiveOrderNewNo : [this.selectedGrievances.executiveOrderNewNo, [ Validators.required ]],
  grievanceSubject : [this.selectedGrievances.grievanceSubject, [ Validators.required ]],
  issuanceExecutiveOrderDate : [this.selectedGrievances.issuanceExecutiveOrderDate, [ ]],
  executiveOrderNumber : [this.selectedGrievances.executiveOrderNumber, [ ]],
  investigationFileNumber : [this.selectedGrievances.investigationFileNumber, [ Validators.required ]],
  employeeCode : [this.selectedGrievances.employeeCode, [ Validators.required ]],
  complainantDateNotification : [this.selectedGrievances.complainantDateNotification, [ Validators.required ]],
  savedTopicDate : [this.selectedGrievances.savedTopicDate, [ Validators.required ]],
  penaltyAfterAmendment : [this.selectedGrievances.penaltyAfterAmendment, [ Validators.required ]],
  decisionChairmanCommission : [this.selectedGrievances.decisionChairmanCommission, [ Validators.required ]],
  branchCode : [this.selectedGrievances.branchCode, [ ]],
  grievanceDestinationCode : [this.selectedGrievances.grievanceDestinationCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.grievancesService.update(this.grievancesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.grievancesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.grievancesForm.get(name);
  }

  initializeLookupServices() {
    this.sanctionsAndTheirCausesService = new LookupService('sanctionsandtheircauses', this.http);
this.commissionChairmanDecisionsService = new LookupService('commissionchairmandecisions', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.departmentsSectionsService = new LookupService('departmentssections', this.http);
  }
}
