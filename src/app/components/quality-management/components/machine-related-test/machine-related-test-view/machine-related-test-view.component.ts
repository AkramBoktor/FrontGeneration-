
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MachineRelatedTest } from 'app/shared/models/machine-related-test';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MachineRelatedTestService } from '../shared/machine-related-test.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-machine-related-test-view',
  templateUrl: './machine-related-test-view.component.html',
  styleUrls: ['./machine-related-test-view.component.scss'],
  providers: []
})

export class MachineRelatedTestViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMachineRelatedTest: MachineRelatedTest;
  machineRelatedTestForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMachineRelatedTestDialog: any,
    @Optional() public dialogRef: MatDialogRef<MachineRelatedTestViewComponent>,
    public machineRelatedTestService: MachineRelatedTestService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMachineRelatedTest = this.selectedMachineRelatedTestDialog.data || this.selectedMachineRelatedTest;

    

    this.machineRelatedTestForm = this.formBuilder.group({
      
  machineCode : [this.selectedMachineRelatedTest.machineCode],
  testCode : [this.selectedMachineRelatedTest.testCode]
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
    return this.machineRelatedTestForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.machineRelatedTestForm.controls)) {
      this.machineRelatedTestForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

