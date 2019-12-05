
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MachineLinkedToTheLaboratory } from 'app/shared/models/machine-linked-to-the-laboratory';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { MachineLinkedToTheLaboratoryService } from '../shared/machine-linked-to-the-laboratory.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-machine-linked-to-the-laboratory-edit',
  templateUrl: './machine-linked-to-the-laboratory-edit.component.html',
  styleUrls: ['./machine-linked-to-the-laboratory-edit.component.scss'],
  providers: []
})

export class MachineLinkedToTheLaboratoryEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMachineLinkedToTheLaboratory: MachineLinkedToTheLaboratory;
  machineLinkedToTheLaboratoryForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private laboratoriesService: LookupService;

  
laboratoryCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratoryCode', { static: true }) LaboratoryCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMachineLinkedToTheLaboratoryDialog: any,
    @Optional() public dialogRef: MatDialogRef<MachineLinkedToTheLaboratoryEditComponent>,
    public machineLinkedToTheLaboratoryService: MachineLinkedToTheLaboratoryService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMachineLinkedToTheLaboratory = new MachineLinkedToTheLaboratory();
    this.selectedMachineLinkedToTheLaboratory = this.selectedMachineLinkedToTheLaboratoryDialog.data || this.selectedMachineLinkedToTheLaboratory;

    
	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});


    this.machineLinkedToTheLaboratoryForm = this.formBuilder.group({
      
  id : [this.selectedMachineLinkedToTheLaboratory.id],
  machineCode : [this.selectedMachineLinkedToTheLaboratory.machineCode, [ Validators.required ]],
  machineName : [this.selectedMachineLinkedToTheLaboratory.machineName, [ Validators.required ]],
  laboratoryCode : [this.selectedMachineLinkedToTheLaboratory.laboratoryCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.machineLinkedToTheLaboratoryService.update(this.machineLinkedToTheLaboratoryForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.machineLinkedToTheLaboratoryService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.machineLinkedToTheLaboratoryForm.get(name);
  }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
  }
}
