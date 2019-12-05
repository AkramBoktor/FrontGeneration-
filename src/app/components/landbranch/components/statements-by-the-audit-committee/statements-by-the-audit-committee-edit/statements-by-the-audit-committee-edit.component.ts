
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { StatementsByTheAuditCommittee } from 'app/shared/models/statements-by-the-audit-committee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { StatementsByTheAuditCommitteeService } from '../shared/statements-by-the-audit-committee.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-statements-by-the-audit-committee-edit',
  templateUrl: './statements-by-the-audit-committee-edit.component.html',
  styleUrls: ['./statements-by-the-audit-committee-edit.component.scss'],
  providers: []
})

export class StatementsByTheAuditCommitteeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedStatementsByTheAuditCommittee: StatementsByTheAuditCommittee;
  statementsByTheAuditCommitteeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedStatementsByTheAuditCommitteeDialog: any,
    @Optional() public dialogRef: MatDialogRef<StatementsByTheAuditCommitteeEditComponent>,
    public statementsByTheAuditCommitteeService: StatementsByTheAuditCommitteeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStatementsByTheAuditCommittee = new StatementsByTheAuditCommittee();
    this.selectedStatementsByTheAuditCommittee = this.selectedStatementsByTheAuditCommitteeDialog.data || this.selectedStatementsByTheAuditCommittee;

    

    this.statementsByTheAuditCommitteeForm = this.formBuilder.group({
      
  id : [this.selectedStatementsByTheAuditCommittee.id],
  landID : [this.selectedStatementsByTheAuditCommittee.landID, [ Validators.required ]],
  committeeNumber : [this.selectedStatementsByTheAuditCommittee.committeeNumber, [ Validators.required ]],
  reviewNoteCode : [this.selectedStatementsByTheAuditCommittee.reviewNoteCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.statementsByTheAuditCommitteeService.update(this.statementsByTheAuditCommitteeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.statementsByTheAuditCommitteeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.statementsByTheAuditCommitteeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
