
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { WorkType } from 'app/shared/models/work-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { WorkTypeService } from '../shared/work-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-work-type-view',
  templateUrl: './work-type-view.component.html',
  styleUrls: ['./work-type-view.component.scss'],
  providers: []
})

export class WorkTypeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedWorkType: WorkType;
  workTypeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedWorkTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<WorkTypeViewComponent>,
    public workTypeService: WorkTypeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedWorkType = this.selectedWorkTypeDialog.data || this.selectedWorkType;

    

    this.workTypeForm = this.formBuilder.group({
      
  code : [this.selectedWorkType.code],
  name : [this.selectedWorkType.name]
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
    return this.workTypeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.workTypeForm.controls)) {
      this.workTypeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

