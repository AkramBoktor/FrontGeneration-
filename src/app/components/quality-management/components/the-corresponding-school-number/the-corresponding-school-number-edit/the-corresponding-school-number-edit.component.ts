
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TheCorrespondingSchoolNumber } from 'app/shared/models/the-corresponding-school-number';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TheCorrespondingSchoolNumberService } from '../shared/the-corresponding-school-number.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-corresponding-school-number-edit',
  templateUrl: './the-corresponding-school-number-edit.component.html',
  styleUrls: ['./the-corresponding-school-number-edit.component.scss'],
  providers: []
})

export class TheCorrespondingSchoolNumberEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheCorrespondingSchoolNumber: TheCorrespondingSchoolNumber;
  theCorrespondingSchoolNumberForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheCorrespondingSchoolNumberDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheCorrespondingSchoolNumberEditComponent>,
    public theCorrespondingSchoolNumberService: TheCorrespondingSchoolNumberService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheCorrespondingSchoolNumber = new TheCorrespondingSchoolNumber();
    this.selectedTheCorrespondingSchoolNumber = this.selectedTheCorrespondingSchoolNumberDialog.data || this.selectedTheCorrespondingSchoolNumber;

    

    this.theCorrespondingSchoolNumberForm = this.formBuilder.group({
      
  id : [this.selectedTheCorrespondingSchoolNumber.id],
  oderNumber : [this.selectedTheCorrespondingSchoolNumber.oderNumber, [ Validators.required ]],
  currentSchoolCode : [this.selectedTheCorrespondingSchoolNumber.currentSchoolCode, [ Validators.required ]],
  correspondingSchool : [this.selectedTheCorrespondingSchoolNumber.correspondingSchool, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.theCorrespondingSchoolNumberService.update(this.theCorrespondingSchoolNumberForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.theCorrespondingSchoolNumberService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.theCorrespondingSchoolNumberForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
