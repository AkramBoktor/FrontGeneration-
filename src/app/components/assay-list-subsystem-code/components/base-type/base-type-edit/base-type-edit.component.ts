
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BaseType } from 'app/shared/models/base-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BaseTypeService } from '../shared/base-type.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-base-type-edit',
  templateUrl: './base-type-edit.component.html',
  styleUrls: ['./base-type-edit.component.scss'],
  providers: []
})

export class BaseTypeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBaseType: BaseType;
  baseTypeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBaseTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<BaseTypeEditComponent>,
    public baseTypeService: BaseTypeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBaseType = new BaseType();
    this.selectedBaseType = this.selectedBaseTypeDialog.data || this.selectedBaseType;

    

    this.baseTypeForm = this.formBuilder.group({
      
  id : [this.selectedBaseType.id],
  code : [this.selectedBaseType.code, [ Validators.required ]],
  name : [this.selectedBaseType.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.baseTypeService.update(this.baseTypeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.baseTypeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.baseTypeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
