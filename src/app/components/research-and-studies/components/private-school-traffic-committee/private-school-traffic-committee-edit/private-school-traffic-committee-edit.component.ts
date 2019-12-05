
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PrivateSchoolTrafficCommittee } from 'app/shared/models/private-school-traffic-committee';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PrivateSchoolTrafficCommitteeService } from '../shared/private-school-traffic-committee.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-private-school-traffic-committee-edit',
  templateUrl: './private-school-traffic-committee-edit.component.html',
  styleUrls: ['./private-school-traffic-committee-edit.component.scss'],
  providers: []
})

export class PrivateSchoolTrafficCommitteeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPrivateSchoolTrafficCommittee: PrivateSchoolTrafficCommittee;
  privateSchoolTrafficCommitteeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPrivateSchoolTrafficCommitteeDialog: any,
    @Optional() public dialogRef: MatDialogRef<PrivateSchoolTrafficCommitteeEditComponent>,
    public privateSchoolTrafficCommitteeService: PrivateSchoolTrafficCommitteeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrivateSchoolTrafficCommittee = new PrivateSchoolTrafficCommittee();
    this.selectedPrivateSchoolTrafficCommittee = this.selectedPrivateSchoolTrafficCommitteeDialog.data || this.selectedPrivateSchoolTrafficCommittee;

    

    this.privateSchoolTrafficCommitteeForm = this.formBuilder.group({
      
  id : [this.selectedPrivateSchoolTrafficCommittee.id],
  schoolCode : [this.selectedPrivateSchoolTrafficCommittee.schoolCode, [ Validators.required ]],
  passageDate : [this.selectedPrivateSchoolTrafficCommittee.passageDate, [ Validators.required ]],
  noteCode : [this.selectedPrivateSchoolTrafficCommittee.noteCode, [ Validators.required ]],
  measures : [this.selectedPrivateSchoolTrafficCommittee.measures, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.privateSchoolTrafficCommitteeService.update(this.privateSchoolTrafficCommitteeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.privateSchoolTrafficCommitteeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.privateSchoolTrafficCommitteeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
