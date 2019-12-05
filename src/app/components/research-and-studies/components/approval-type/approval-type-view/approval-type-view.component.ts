
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ApprovalType } from 'app/shared/models/approval-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ApprovalTypeService } from '../shared/approval-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-approval-type-view',
  templateUrl: './approval-type-view.component.html',
  styleUrls: ['./approval-type-view.component.scss'],
  providers: []
})

export class ApprovalTypeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedApprovalType: ApprovalType;
  approvalTypeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedApprovalTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ApprovalTypeViewComponent>,
    public approvalTypeService: ApprovalTypeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedApprovalType = this.selectedApprovalTypeDialog.data || this.selectedApprovalType;

    

    this.approvalTypeForm = this.formBuilder.group({
      
  approvalCode : [this.selectedApprovalType.approvalCode],
  approvalName : [this.selectedApprovalType.approvalName]
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
    return this.approvalTypeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.approvalTypeForm.controls)) {
      this.approvalTypeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

