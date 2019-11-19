
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PeopleAssemblyApproval } from 'app/shared/models/people-assembly-approval';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PeopleAssemblyApprovalService } from '../shared/people-assembly-approval.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-people-assembly-approval-view',
  templateUrl: './people-assembly-approval-view.component.html',
  styleUrls: ['./people-assembly-approval-view.component.scss'],
  providers: []
})

export class PeopleAssemblyApprovalViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPeopleAssemblyApproval: PeopleAssemblyApproval;
  peopleAssemblyApprovalForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPeopleAssemblyApprovalDialog: any,
    @Optional() public dialogRef: MatDialogRef<PeopleAssemblyApprovalViewComponent>,
    public peopleAssemblyApprovalService: PeopleAssemblyApprovalService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeopleAssemblyApproval = this.selectedPeopleAssemblyApprovalDialog.data || this.selectedPeopleAssemblyApproval;

    

    this.peopleAssemblyApprovalForm = this.formBuilder.group({
      
  schoolNumber : [this.selectedPeopleAssemblyApproval.schoolNumber],
  theNumber : [this.selectedPeopleAssemblyApproval.theNumber],
  date : [this.selectedPeopleAssemblyApproval.date]
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
    return this.peopleAssemblyApprovalForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.peopleAssemblyApprovalForm.controls)) {
      this.peopleAssemblyApprovalForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

