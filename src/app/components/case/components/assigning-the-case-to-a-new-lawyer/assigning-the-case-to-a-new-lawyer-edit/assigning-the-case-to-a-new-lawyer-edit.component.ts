
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssigningTheCaseToANewLawyer } from 'app/shared/models/assigning-the-case-to-a-new-lawyer';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AssigningTheCaseToANewLawyerService } from '../shared/assigning-the-case-to-a-new-lawyer.service';




@Component({
  selector: 'app-assigning-the-case-to-a-new-lawyer-edit',
  templateUrl: './assigning-the-case-to-a-new-lawyer-edit.component.html',
  styleUrls: ['./assigning-the-case-to-a-new-lawyer-edit.component.scss'],
  providers: []
})

export class AssigningTheCaseToANewLawyerEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssigningTheCaseToANewLawyer: AssigningTheCaseToANewLawyer;
  assigningTheCaseToANewLawyerForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private issueCodeIssuesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
issueCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('issueCode', { static: true }) IssueCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssigningTheCaseToANewLawyerDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssigningTheCaseToANewLawyerEditComponent>,
    public assigningTheCaseToANewLawyerService: AssigningTheCaseToANewLawyerService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssigningTheCaseToANewLawyer = new AssigningTheCaseToANewLawyer();
    this.selectedAssigningTheCaseToANewLawyer = this.selectedAssigningTheCaseToANewLawyerDialog.data || this.selectedAssigningTheCaseToANewLawyer;

    
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

	this.issueCodeSelectOptions = new MaterialSelectOptions({
	 data: this.issueCodeIssuesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود موضوع القضية',
	});


    this.assigningTheCaseToANewLawyerForm = this.formBuilder.group({
      
  id : [this.selectedAssigningTheCaseToANewLawyer.id],
  fileNumber : [this.selectedAssigningTheCaseToANewLawyer.fileNumber, [ Validators.required ]],
  lawsuitNumber : [this.selectedAssigningTheCaseToANewLawyer.lawsuitNumber, [ ]],
  year : [this.selectedAssigningTheCaseToANewLawyer.year, [ ]],
  incomingDate : [this.selectedAssigningTheCaseToANewLawyer.incomingDate, [ ]],
  employeeCode : [this.selectedAssigningTheCaseToANewLawyer.employeeCode, [ Validators.required ]],
  receiptAttorneyDate : [this.selectedAssigningTheCaseToANewLawyer.receiptAttorneyDate, [ Validators.required ]],
  branchCode : [this.selectedAssigningTheCaseToANewLawyer.branchCode, [ ]],
  entityType : [this.selectedAssigningTheCaseToANewLawyer.entityType, [ ]],
  issueCode : [this.selectedAssigningTheCaseToANewLawyer.issueCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.assigningTheCaseToANewLawyerService.update(this.assigningTheCaseToANewLawyerForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assigningTheCaseToANewLawyerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assigningTheCaseToANewLawyerForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.issueCodeIssuesService = new LookupService('issuecodeissues', this.http);
  }
}
