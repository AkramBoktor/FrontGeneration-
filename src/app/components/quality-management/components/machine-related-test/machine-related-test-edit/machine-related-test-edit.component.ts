
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MachineRelatedTest } from 'app/shared/models/machine-related-test';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MachineRelatedTestService } from '../shared/machine-related-test.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-machine-related-test-edit',
  templateUrl: './machine-related-test-edit.component.html',
  styleUrls: ['./machine-related-test-edit.component.scss'],
  providers: []
})

export class MachineRelatedTestEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMachineRelatedTest: MachineRelatedTest;
  machineRelatedTestForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMachineRelatedTestDialog: any,
    @Optional() public dialogRef: MatDialogRef<MachineRelatedTestEditComponent>,
    public machineRelatedTestService: MachineRelatedTestService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMachineRelatedTest = new MachineRelatedTest();
    this.selectedMachineRelatedTest = this.selectedMachineRelatedTestDialog.data || this.selectedMachineRelatedTest;

    

    this.machineRelatedTestForm = this.formBuilder.group({
      
  id : [this.selectedMachineRelatedTest.id],
  machineCode : [this.selectedMachineRelatedTest.machineCode, [ Validators.required ]],
  testCode : [this.selectedMachineRelatedTest.testCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.machineRelatedTestService.update(this.machineRelatedTestForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.machineRelatedTestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.machineRelatedTestForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
