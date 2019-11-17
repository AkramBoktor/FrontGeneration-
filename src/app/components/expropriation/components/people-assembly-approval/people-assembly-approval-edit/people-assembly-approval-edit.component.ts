
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PeopleAssemblyApproval } from 'app/shared/models/people-assembly-approval';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PeopleAssemblyApprovalService } from '../shared/people-assembly-approval.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-people-assembly-approval-edit',
  templateUrl: './people-assembly-approval-edit.component.html',
  styleUrls: ['./people-assembly-approval-edit.component.scss'],
  providers: []
})

export class PeopleAssemblyApprovalEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPeopleAssemblyApproval: PeopleAssemblyApproval;
  peopleAssemblyApprovalForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPeopleAssemblyApprovalDialog: any,
    @Optional() public dialogRef: MatDialogRef<PeopleAssemblyApprovalEditComponent>,
    public peopleAssemblyApprovalService: PeopleAssemblyApprovalService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPeopleAssemblyApproval = new PeopleAssemblyApproval();
    this.selectedPeopleAssemblyApproval = this.selectedPeopleAssemblyApprovalDialog.data || this.selectedPeopleAssemblyApproval;

    

    this.peopleAssemblyApprovalForm = this.formBuilder.group({
      
  id : [this.selectedPeopleAssemblyApproval.id],
  schoolNumber : [this.selectedPeopleAssemblyApproval.schoolNumber, [ Validators.required ]],
  theNumber : [this.selectedPeopleAssemblyApproval.theNumber, [ Validators.required ]],
  date : [this.selectedPeopleAssemblyApproval.date, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.peopleAssemblyApprovalService.update(this.peopleAssemblyApprovalForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.peopleAssemblyApprovalService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.peopleAssemblyApprovalForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
