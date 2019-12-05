
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ApprovalType } from 'app/shared/models/approval-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ApprovalTypeService } from '../shared/approval-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-approval-type-new',
  templateUrl: './approval-type-new.component.html',
  styleUrls: ['./approval-type-new.component.scss'],
  providers: [
    ]
})

export class ApprovalTypeNewComponent extends AppBaseComponent implements OnInit {
  approvalTypeForm: FormGroup;
  @Input() selectedApprovalType: ApprovalType;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ApprovalTypeNewComponent>,
    public approvalTypeService: ApprovalTypeService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedApprovalType = new ApprovalType();

    

    this.approvalTypeForm = this.formBuilder.group({
     
  id : [0],
  approvalCode : [this.selectedApprovalType.approvalCode, [ Validators.required ]],
  approvalName : [this.selectedApprovalType.approvalName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.approvalTypeService.create(this.approvalTypeForm.value)
        .pipe(switchMap(x => {
			return this.approvalTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.approvalTypeForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
