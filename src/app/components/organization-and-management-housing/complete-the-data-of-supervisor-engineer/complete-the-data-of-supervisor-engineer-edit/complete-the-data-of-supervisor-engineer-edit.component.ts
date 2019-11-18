
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CompleteTheDataOfSupervisorEngineer } from 'app/shared/models/complete-the-data-of-supervisor-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CompleteTheDataOfSupervisorEngineerService } from '../shared/complete-the-data-of-supervisor-engineer.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-complete-the-data-of-supervisor-engineer-edit',
  templateUrl: './complete-the-data-of-supervisor-engineer-edit.component.html',
  styleUrls: ['./complete-the-data-of-supervisor-engineer-edit.component.scss'],
  providers: []
})

export class CompleteTheDataOfSupervisorEngineerEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCompleteTheDataOfSupervisorEngineer: CompleteTheDataOfSupervisorEngineer;
  completeTheDataOfSupervisorEngineerForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCompleteTheDataOfSupervisorEngineerDialog: any,
    @Optional() public dialogRef: MatDialogRef<CompleteTheDataOfSupervisorEngineerEditComponent>,
    public completeTheDataOfSupervisorEngineerService: CompleteTheDataOfSupervisorEngineerService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCompleteTheDataOfSupervisorEngineer = new CompleteTheDataOfSupervisorEngineer();
    this.selectedCompleteTheDataOfSupervisorEngineer = this.selectedCompleteTheDataOfSupervisorEngineerDialog.data || this.selectedCompleteTheDataOfSupervisorEngineer;

    

    this.completeTheDataOfSupervisorEngineerForm = this.formBuilder.group({
      
  id : [this.selectedCompleteTheDataOfSupervisorEngineer.id],
  employeeCode : [this.selectedCompleteTheDataOfSupervisorEngineer.employeeCode, [ Validators.required ]],
  phoneNumber1 : [this.selectedCompleteTheDataOfSupervisorEngineer.phoneNumber1, [ Validators.required ]],
  phoneNumber2 : [this.selectedCompleteTheDataOfSupervisorEngineer.phoneNumber2, [ Validators.required ]],
  phoneNumber3 : [this.selectedCompleteTheDataOfSupervisorEngineer.phoneNumber3, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.completeTheDataOfSupervisorEngineerService.update(this.completeTheDataOfSupervisorEngineerForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.completeTheDataOfSupervisorEngineerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.completeTheDataOfSupervisorEngineerForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
