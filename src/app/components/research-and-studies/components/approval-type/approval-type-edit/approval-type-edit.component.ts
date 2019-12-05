
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ApprovalType } from 'app/shared/models/approval-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ApprovalTypeService } from '../shared/approval-type.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-approval-type-edit',
  templateUrl: './approval-type-edit.component.html',
  styleUrls: ['./approval-type-edit.component.scss'],
  providers: []
})

export class ApprovalTypeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedApprovalType: ApprovalType;
  approvalTypeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedApprovalTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ApprovalTypeEditComponent>,
    public approvalTypeService: ApprovalTypeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedApprovalType = new ApprovalType();
    this.selectedApprovalType = this.selectedApprovalTypeDialog.data || this.selectedApprovalType;

    

    this.approvalTypeForm = this.formBuilder.group({
      
  id : [this.selectedApprovalType.id],
  approvalCode : [this.selectedApprovalType.approvalCode, [ Validators.required ]],
  approvalName : [this.selectedApprovalType.approvalName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.approvalTypeService.update(this.approvalTypeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.approvalTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.approvalTypeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
