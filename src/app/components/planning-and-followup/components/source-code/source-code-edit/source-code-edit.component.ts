
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SourceCode } from 'app/shared/models/source-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { SourceCodeService } from '../shared/source-code.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-source-code-edit',
  templateUrl: './source-code-edit.component.html',
  styleUrls: ['./source-code-edit.component.scss'],
  providers: []
})

export class SourceCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSourceCode: SourceCode;
  sourceCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSourceCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<SourceCodeEditComponent>,
    public sourceCodeService: SourceCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSourceCode = new SourceCode();
    this.selectedSourceCode = this.selectedSourceCodeDialog.data || this.selectedSourceCode;

    

    this.sourceCodeForm = this.formBuilder.group({
      
  id : [this.selectedSourceCode.id],
  code : [this.selectedSourceCode.code, [ Validators.required ]],
  name : [this.selectedSourceCode.name, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.sourceCodeService.update(this.sourceCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.sourceCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.sourceCodeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
