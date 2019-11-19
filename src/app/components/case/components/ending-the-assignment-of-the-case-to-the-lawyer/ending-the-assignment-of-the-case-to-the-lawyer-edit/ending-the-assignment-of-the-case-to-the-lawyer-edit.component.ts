
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EndingTheAssignmentOfTheCaseToTheLawyer } from 'app/shared/models/ending-the-assignment-of-the-case-to-the-lawyer';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { EndingTheAssignmentOfTheCaseToTheLawyerService } from '../shared/ending-the-assignment-of-the-case-to-the-lawyer.service';




@Component({
  selector: 'app-ending-the-assignment-of-the-case-to-the-lawyer-edit',
  templateUrl: './ending-the-assignment-of-the-case-to-the-lawyer-edit.component.html',
  styleUrls: ['./ending-the-assignment-of-the-case-to-the-lawyer-edit.component.scss'],
  providers: []
})

export class EndingTheAssignmentOfTheCaseToTheLawyerEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndingTheAssignmentOfTheCaseToTheLawyer: EndingTheAssignmentOfTheCaseToTheLawyer;
  endingTheAssignmentOfTheCaseToTheLawyerForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private issueCodeIssuesService: LookupService;
private terminationOfAttorneyAttorneyReasonsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;
caseReasonSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('issueCode', { static: true }) IssueCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('caseReason', { static: true }) CaseReasonSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndingTheAssignmentOfTheCaseToTheLawyerDialog: any,
    @Optional() public dialogRef: MatDialogRef<EndingTheAssignmentOfTheCaseToTheLawyerEditComponent>,
    public endingTheAssignmentOfTheCaseToTheLawyerService: EndingTheAssignmentOfTheCaseToTheLawyerService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndingTheAssignmentOfTheCaseToTheLawyer = new EndingTheAssignmentOfTheCaseToTheLawyer();
    this.selectedEndingTheAssignmentOfTheCaseToTheLawyer = this.selectedEndingTheAssignmentOfTheCaseToTheLawyerDialog.data || this.selectedEndingTheAssignmentOfTheCaseToTheLawyer;

    
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

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});

	this.caseReasonSelectOptions = new MaterialSelectOptions({
	 data: this.terminationOfAttorneyAttorneyReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب انهاء اسناد القضية',
	});


    this.endingTheAssignmentOfTheCaseToTheLawyerForm = this.formBuilder.group({
      
  id : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.id],
  fileNumber : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.fileNumber, [ Validators.required ]],
  lawsuitNumber : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.lawsuitNumber, [ ]],
  year : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.year, [ ]],
  incomingDate : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.incomingDate, [ ]],
  employeeCode : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.employeeCode, [ Validators.required ]],
  directorAssignmentDate : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.directorAssignmentDate, [ Validators.required ]],
  lawyerExpiryDate : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.lawyerExpiryDate, [ Validators.required ]],
  branchCode : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.branchCode, [ ]],
  entityType : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.entityType, [ ]],
  entityCode : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.entityCode, [ ]],
  issueCode : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.issueCode, [ ]],
  caseReason : [this.selectedEndingTheAssignmentOfTheCaseToTheLawyer.caseReason, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.endingTheAssignmentOfTheCaseToTheLawyerService.update(this.endingTheAssignmentOfTheCaseToTheLawyerForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.endingTheAssignmentOfTheCaseToTheLawyerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.endingTheAssignmentOfTheCaseToTheLawyerForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
this.terminationOfAttorneyAttorneyReasonsService = new LookupService('terminationofattorneyattorneyreasons', this.http);
  }
}
