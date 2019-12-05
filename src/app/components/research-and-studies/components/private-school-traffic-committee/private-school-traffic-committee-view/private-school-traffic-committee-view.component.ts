
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PrivateSchoolTrafficCommittee } from 'app/shared/models/private-school-traffic-committee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PrivateSchoolTrafficCommitteeService } from '../shared/private-school-traffic-committee.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-private-school-traffic-committee-view',
  templateUrl: './private-school-traffic-committee-view.component.html',
  styleUrls: ['./private-school-traffic-committee-view.component.scss'],
  providers: []
})

export class PrivateSchoolTrafficCommitteeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPrivateSchoolTrafficCommittee: PrivateSchoolTrafficCommittee;
  privateSchoolTrafficCommitteeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPrivateSchoolTrafficCommitteeDialog: any,
    @Optional() public dialogRef: MatDialogRef<PrivateSchoolTrafficCommitteeViewComponent>,
    public privateSchoolTrafficCommitteeService: PrivateSchoolTrafficCommitteeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrivateSchoolTrafficCommittee = this.selectedPrivateSchoolTrafficCommitteeDialog.data || this.selectedPrivateSchoolTrafficCommittee;

    

    this.privateSchoolTrafficCommitteeForm = this.formBuilder.group({
      
  schoolCode : [this.selectedPrivateSchoolTrafficCommittee.schoolCode],
  passageDate : [this.selectedPrivateSchoolTrafficCommittee.passageDate],
  noteCode : [this.selectedPrivateSchoolTrafficCommittee.noteCode],
  measures : [this.selectedPrivateSchoolTrafficCommittee.measures]
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
    return this.privateSchoolTrafficCommitteeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.privateSchoolTrafficCommitteeForm.controls)) {
      this.privateSchoolTrafficCommitteeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

