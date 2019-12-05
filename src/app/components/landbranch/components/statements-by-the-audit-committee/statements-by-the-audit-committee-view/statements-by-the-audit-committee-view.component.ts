
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { StatementsByTheAuditCommittee } from 'app/shared/models/statements-by-the-audit-committee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { StatementsByTheAuditCommitteeService } from '../shared/statements-by-the-audit-committee.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-statements-by-the-audit-committee-view',
  templateUrl: './statements-by-the-audit-committee-view.component.html',
  styleUrls: ['./statements-by-the-audit-committee-view.component.scss'],
  providers: []
})

export class StatementsByTheAuditCommitteeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedStatementsByTheAuditCommittee: StatementsByTheAuditCommittee;
  statementsByTheAuditCommitteeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedStatementsByTheAuditCommitteeDialog: any,
    @Optional() public dialogRef: MatDialogRef<StatementsByTheAuditCommitteeViewComponent>,
    public statementsByTheAuditCommitteeService: StatementsByTheAuditCommitteeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStatementsByTheAuditCommittee = this.selectedStatementsByTheAuditCommitteeDialog.data || this.selectedStatementsByTheAuditCommittee;

    

    this.statementsByTheAuditCommitteeForm = this.formBuilder.group({
      
  landID : [this.selectedStatementsByTheAuditCommittee.landID],
  committeeNumber : [this.selectedStatementsByTheAuditCommittee.committeeNumber],
  reviewNoteCode : [this.selectedStatementsByTheAuditCommittee.reviewNoteCode]
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
    return this.statementsByTheAuditCommitteeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.statementsByTheAuditCommitteeForm.controls)) {
      this.statementsByTheAuditCommitteeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

