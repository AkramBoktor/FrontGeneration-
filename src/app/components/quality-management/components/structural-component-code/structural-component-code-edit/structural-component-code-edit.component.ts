
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { StructuralComponentCode } from 'app/shared/models/structural-component-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { StructuralComponentCodeService } from '../shared/structural-component-code.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-structural-component-code-edit',
  templateUrl: './structural-component-code-edit.component.html',
  styleUrls: ['./structural-component-code-edit.component.scss'],
  providers: []
})

export class StructuralComponentCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedStructuralComponentCode: StructuralComponentCode;
  structuralComponentCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedStructuralComponentCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<StructuralComponentCodeEditComponent>,
    public structuralComponentCodeService: StructuralComponentCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedStructuralComponentCode = new StructuralComponentCode();
    this.selectedStructuralComponentCode = this.selectedStructuralComponentCodeDialog.data || this.selectedStructuralComponentCode;

    

    this.structuralComponentCodeForm = this.formBuilder.group({
      
  id : [this.selectedStructuralComponentCode.id],
  elementCode : [this.selectedStructuralComponentCode.elementCode, [ Validators.required ]],
  structuralElementName : [this.selectedStructuralComponentCode.structuralElementName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.structuralComponentCodeService.update(this.structuralComponentCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.structuralComponentCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.structuralComponentCodeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
