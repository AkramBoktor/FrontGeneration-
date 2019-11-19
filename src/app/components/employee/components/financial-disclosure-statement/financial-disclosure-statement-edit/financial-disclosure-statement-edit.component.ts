
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FinancialDisclosureStatement } from 'app/shared/models/financial-disclosure-statement';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { FinancialDisclosureStatementService } from '../shared/financial-disclosure-statement.service';




@Component({
  selector: 'app-financial-disclosure-statement-edit',
  templateUrl: './financial-disclosure-statement-edit.component.html',
  styleUrls: ['./financial-disclosure-statement-edit.component.scss'],
  providers: []
})

export class FinancialDisclosureStatementEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFinancialDisclosureStatement: FinancialDisclosureStatement;
  financialDisclosureStatementForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private financialCrisisAdoptionsService: LookupService;

  
submissionReasonSelectOptions: MaterialSelectOptions;

  
	@ViewChild('submissionReason', { static: true }) SubmissionReasonSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFinancialDisclosureStatementDialog: any,
    @Optional() public dialogRef: MatDialogRef<FinancialDisclosureStatementEditComponent>,
    public financialDisclosureStatementService: FinancialDisclosureStatementService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFinancialDisclosureStatement = new FinancialDisclosureStatement();
    this.selectedFinancialDisclosureStatement = this.selectedFinancialDisclosureStatementDialog.data || this.selectedFinancialDisclosureStatement;

    
	this.submissionReasonSelectOptions = new MaterialSelectOptions({
	 data: this.financialCrisisAdoptionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب  تقديم الاقرار',
	});


    this.financialDisclosureStatementForm = this.formBuilder.group({
      
  id : [this.selectedFinancialDisclosureStatement.id],
  employeeCode : [this.selectedFinancialDisclosureStatement.employeeCode, [ ]],
  submissionDate : [this.selectedFinancialDisclosureStatement.submissionDate, [ Validators.required ]],
  fileDeliveryDate : [this.selectedFinancialDisclosureStatement.fileDeliveryDate, [ Validators.required ]],
  fileReceiptDate : [this.selectedFinancialDisclosureStatement.fileReceiptDate, [ ]],
  submissionReason : [this.selectedFinancialDisclosureStatement.submissionReason, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.financialDisclosureStatementService.update(this.financialDisclosureStatementForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.financialDisclosureStatementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.financialDisclosureStatementForm.get(name);
  }

  initializeLookupServices() {
    this.financialCrisisAdoptionsService = new LookupService('financialcrisisadoptions', this.http);
  }
}
