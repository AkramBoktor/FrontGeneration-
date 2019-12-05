
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TypicalCodesOfGeneralConditionsForAssays } from 'app/shared/models/typical-codes-of-general-conditions-for-assays';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TypicalCodesOfGeneralConditionsForAssaysService } from '../shared/typical-codes-of-general-conditions-for-assays.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-codes-of-general-conditions-for-assays-edit',
  templateUrl: './typical-codes-of-general-conditions-for-assays-edit.component.html',
  styleUrls: ['./typical-codes-of-general-conditions-for-assays-edit.component.scss'],
  providers: []
})

export class TypicalCodesOfGeneralConditionsForAssaysEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalCodesOfGeneralConditionsForAssays: TypicalCodesOfGeneralConditionsForAssays;
  typicalCodesOfGeneralConditionsForAssaysForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalCodesOfGeneralConditionsForAssaysDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalCodesOfGeneralConditionsForAssaysEditComponent>,
    public typicalCodesOfGeneralConditionsForAssaysService: TypicalCodesOfGeneralConditionsForAssaysService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalCodesOfGeneralConditionsForAssays = new TypicalCodesOfGeneralConditionsForAssays();
    this.selectedTypicalCodesOfGeneralConditionsForAssays = this.selectedTypicalCodesOfGeneralConditionsForAssaysDialog.data || this.selectedTypicalCodesOfGeneralConditionsForAssays;

    

    this.typicalCodesOfGeneralConditionsForAssaysForm = this.formBuilder.group({
      
  id : [this.selectedTypicalCodesOfGeneralConditionsForAssays.id],
  conditionCode : [this.selectedTypicalCodesOfGeneralConditionsForAssays.conditionCode, [ Validators.required ]],
  conditionName : [this.selectedTypicalCodesOfGeneralConditionsForAssays.conditionName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.typicalCodesOfGeneralConditionsForAssaysService.update(this.typicalCodesOfGeneralConditionsForAssaysForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.typicalCodesOfGeneralConditionsForAssaysService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.typicalCodesOfGeneralConditionsForAssaysForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
