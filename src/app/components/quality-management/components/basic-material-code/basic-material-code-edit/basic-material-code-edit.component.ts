
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BasicMaterialCode } from 'app/shared/models/basic-material-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BasicMaterialCodeService } from '../shared/basic-material-code.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-basic-material-code-edit',
  templateUrl: './basic-material-code-edit.component.html',
  styleUrls: ['./basic-material-code-edit.component.scss'],
  providers: []
})

export class BasicMaterialCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBasicMaterialCode: BasicMaterialCode;
  basicMaterialCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBasicMaterialCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<BasicMaterialCodeEditComponent>,
    public basicMaterialCodeService: BasicMaterialCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicMaterialCode = new BasicMaterialCode();
    this.selectedBasicMaterialCode = this.selectedBasicMaterialCodeDialog.data || this.selectedBasicMaterialCode;

    

    this.basicMaterialCodeForm = this.formBuilder.group({
      
  id : [this.selectedBasicMaterialCode.id],
  basicMaterialCode : [this.selectedBasicMaterialCode.basicMaterialCode, [ Validators.required ]],
  basicMaterialName : [this.selectedBasicMaterialCode.basicMaterialName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.basicMaterialCodeService.update(this.basicMaterialCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.basicMaterialCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.basicMaterialCodeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
