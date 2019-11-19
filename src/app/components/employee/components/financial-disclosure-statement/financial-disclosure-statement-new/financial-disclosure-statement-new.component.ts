
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FinancialDisclosureStatement } from 'app/shared/models/financial-disclosure-statement';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { FinancialDisclosureStatementService } from '../shared/financial-disclosure-statement.service';


@Component({
  selector: 'app-financial-disclosure-statement-new',
  templateUrl: './financial-disclosure-statement-new.component.html',
  styleUrls: ['./financial-disclosure-statement-new.component.scss'],
  providers: [
    ]
})

export class FinancialDisclosureStatementNewComponent extends AppBaseComponent implements OnInit {
  financialDisclosureStatementForm: FormGroup;
  @Input() selectedFinancialDisclosureStatement: FinancialDisclosureStatement;
  errorMessages: FormControlError[] = [
        
  ];

  private financialCrisisAdoptionsService: LookupService;

  
submissionReasonSelectOptions: MaterialSelectOptions;

  
	@ViewChild('submissionReason', { static: true }) SubmissionReasonSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FinancialDisclosureStatementNewComponent>,
    public financialDisclosureStatementService: FinancialDisclosureStatementService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFinancialDisclosureStatement = new FinancialDisclosureStatement();

    
	this.submissionReasonSelectOptions = new MaterialSelectOptions({
	 data: this.financialCrisisAdoptionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب  تقديم الاقرار',
	});


    this.financialDisclosureStatementForm = this.formBuilder.group({
     
  id : [0],
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
    this.financialDisclosureStatementService.create(this.financialDisclosureStatementForm.value)
        .pipe(switchMap(x => {
			return this.financialDisclosureStatementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.financialDisclosureStatementForm.get(name);
    }

  initializeLookupServices() {
    this.financialCrisisAdoptionsService = new LookupService('financialcrisisadoptions', this.http);
  }
 }
