
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { StatementsByTheAuditCommittee } from 'app/shared/models/statements-by-the-audit-committee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { StatementsByTheAuditCommitteeService } from '../shared/statements-by-the-audit-committee.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-statements-by-the-audit-committee-new',
  templateUrl: './statements-by-the-audit-committee-new.component.html',
  styleUrls: ['./statements-by-the-audit-committee-new.component.scss'],
  providers: [
    ]
})

export class StatementsByTheAuditCommitteeNewComponent extends AppBaseComponent implements OnInit {
  statementsByTheAuditCommitteeForm: FormGroup;
  @Input() selectedStatementsByTheAuditCommittee: StatementsByTheAuditCommittee;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<StatementsByTheAuditCommitteeNewComponent>,
    public statementsByTheAuditCommitteeService: StatementsByTheAuditCommitteeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStatementsByTheAuditCommittee = new StatementsByTheAuditCommittee();

    

    this.statementsByTheAuditCommitteeForm = this.formBuilder.group({
     
  id : [0],
  landID : [this.selectedStatementsByTheAuditCommittee.landID, [ Validators.required ]],
  committeeNumber : [this.selectedStatementsByTheAuditCommittee.committeeNumber, [ Validators.required ]],
  reviewNoteCode : [this.selectedStatementsByTheAuditCommittee.reviewNoteCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.statementsByTheAuditCommitteeService.create(this.statementsByTheAuditCommitteeForm.value)
        .pipe(switchMap(x => {
			return this.statementsByTheAuditCommitteeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.statementsByTheAuditCommitteeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
