
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MachineLinkedToTheLaboratory } from 'app/shared/models/machine-linked-to-the-laboratory';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MachineLinkedToTheLaboratoryService } from '../shared/machine-linked-to-the-laboratory.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-machine-linked-to-the-laboratory-view',
  templateUrl: './machine-linked-to-the-laboratory-view.component.html',
  styleUrls: ['./machine-linked-to-the-laboratory-view.component.scss'],
  providers: []
})

export class MachineLinkedToTheLaboratoryViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMachineLinkedToTheLaboratory: MachineLinkedToTheLaboratory;
  machineLinkedToTheLaboratoryForm: FormGroup;

  private laboratoriesService: LookupService;

  
laboratoryCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMachineLinkedToTheLaboratoryDialog: any,
    @Optional() public dialogRef: MatDialogRef<MachineLinkedToTheLaboratoryViewComponent>,
    public machineLinkedToTheLaboratoryService: MachineLinkedToTheLaboratoryService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMachineLinkedToTheLaboratory = this.selectedMachineLinkedToTheLaboratoryDialog.data || this.selectedMachineLinkedToTheLaboratory;

    
	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});


    this.machineLinkedToTheLaboratoryForm = this.formBuilder.group({
      
  machineCode : [this.selectedMachineLinkedToTheLaboratory.machineCode],
  machineName : [this.selectedMachineLinkedToTheLaboratory.machineName],
  laboratoryCode : [this.selectedMachineLinkedToTheLaboratory.laboratoryCode]
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
    return this.machineLinkedToTheLaboratoryForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.machineLinkedToTheLaboratoryForm.controls)) {
      this.machineLinkedToTheLaboratoryForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
  }
}

