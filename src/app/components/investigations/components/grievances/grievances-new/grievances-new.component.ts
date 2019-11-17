
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Grievances } from 'app/shared/models/grievances';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { GrievancesService } from '../shared/grievances.service';


@Component({
  selector: 'app-grievances-new',
  templateUrl: './grievances-new.component.html',
  styleUrls: ['./grievances-new.component.scss'],
  providers: [
    ]
})

export class GrievancesNewComponent extends AppBaseComponent implements OnInit {
  grievancesForm: FormGroup;
  @Input() selectedGrievances: Grievances;
  errorMessages: FormControlError[] = [
        
  ];

  private departmentsSectionsService: LookupService;
private branchCodesService: LookupService;
private commissionChairmanDecisionsService: LookupService;
private sanctionsAndTheirCausesService: LookupService;

  
grievanceDestinationCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
decisionChairmanCommissionSelectOptions: MaterialSelectOptions;
penaltyAfterAmendmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('grievanceDestinationCode', { static: true }) GrievanceDestinationCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('decisionChairmanCommission', { static: true }) DecisionChairmanCommissionSelectComponent: MaterialSelectComponent;
	@ViewChild('penaltyAfterAmendment', { static: true }) PenaltyAfterAmendmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<GrievancesNewComponent>,
    public grievancesService: GrievancesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGrievances = new Grievances();

    
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
     
  id : [0],
  fileNumber : [this.selectedGrievances.fileNumber, [ Validators.required ]],
  employeeCode : [this.selectedGrievances.employeeCode, [ Validators.required ]],
  investigationFileNumber : [this.selectedGrievances.investigationFileNumber, [ Validators.required ]],
  executiveOrderNumber : [this.selectedGrievances.executiveOrderNumber, [ ]],
  issuanceExecutiveOrderDate : [this.selectedGrievances.issuanceExecutiveOrderDate, [ ]],
  grievanceSubject : [this.selectedGrievances.grievanceSubject, [ Validators.required ]],
  executiveOrderNewNo : [this.selectedGrievances.executiveOrderNewNo, [ Validators.required ]],
  executiveOrderNewDate : [this.selectedGrievances.executiveOrderNewDate, [ Validators.required ]],
  containedArchiveDate : [this.selectedGrievances.containedArchiveDate, [ Validators.required ]],
  incomingNumber : [this.selectedGrievances.incomingNumber, [ Validators.required ]],
  receivedDate : [this.selectedGrievances.receivedDate, [ Validators.required ]],
  lawyerCode : [this.selectedGrievances.lawyerCode, [ Validators.required ]],
  referralDate : [this.selectedGrievances.referralDate, [ Validators.required ]],
  grievanceSearchHistory : [this.selectedGrievances.grievanceSearchHistory, [ Validators.required ]],
  grievanceSearchResult : [this.selectedGrievances.grievanceSearchResult, [ Validators.required ]],
  presentationChairmanCommissionDate : [this.selectedGrievances.presentationChairmanCommissionDate, [ Validators.required ]],
  chairmanDecisionDate : [this.selectedGrievances.chairmanDecisionDate, [ Validators.required ]],
  notificationAffairsDate : [this.selectedGrievances.notificationAffairsDate, [ ]],
  complainantDateNotification : [this.selectedGrievances.complainantDateNotification, [ Validators.required ]],
  savedTopicDate : [this.selectedGrievances.savedTopicDate, [ Validators.required ]],
  grievanceDestinationCode : [this.selectedGrievances.grievanceDestinationCode, [ Validators.required ]],
  branchCode : [this.selectedGrievances.branchCode, [ ]],
  decisionChairmanCommission : [this.selectedGrievances.decisionChairmanCommission, [ Validators.required ]],
  penaltyAfterAmendment : [this.selectedGrievances.penaltyAfterAmendment, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.grievancesService.create(this.grievancesForm.value)
        .pipe(switchMap(x => {
			return this.grievancesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.grievancesForm.get(name);
    }

  initializeLookupServices() {
    this.departmentsSectionsService = new LookupService('departmentssections', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.commissionChairmanDecisionsService = new LookupService('commissionchairmandecisions', this.http);
this.sanctionsAndTheirCausesService = new LookupService('sanctionsandtheircauses', this.http);
  }
 }
