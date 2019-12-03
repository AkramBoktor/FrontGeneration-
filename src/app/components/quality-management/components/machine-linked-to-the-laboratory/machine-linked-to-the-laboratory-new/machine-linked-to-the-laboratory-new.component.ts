
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MachineLinkedToTheLaboratory } from 'app/shared/models/machine-linked-to-the-laboratory';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MachineLinkedToTheLaboratoryService } from '../shared/machine-linked-to-the-laboratory.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-machine-linked-to-the-laboratory-new',
  templateUrl: './machine-linked-to-the-laboratory-new.component.html',
  styleUrls: ['./machine-linked-to-the-laboratory-new.component.scss'],
  providers: [
    ]
})

export class MachineLinkedToTheLaboratoryNewComponent extends AppBaseComponent implements OnInit {
  machineLinkedToTheLaboratoryForm: FormGroup;
  @Input() selectedMachineLinkedToTheLaboratory: MachineLinkedToTheLaboratory;
  errorMessages: FormControlError[] = [
        
  ];

  private laboratoriesService: LookupService;

  
laboratoryCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('laboratoryCode', { static: true }) LaboratoryCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MachineLinkedToTheLaboratoryNewComponent>,
    public machineLinkedToTheLaboratoryService: MachineLinkedToTheLaboratoryService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMachineLinkedToTheLaboratory = new MachineLinkedToTheLaboratory();

    
	this.laboratoryCodeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعمل',
	});


    this.machineLinkedToTheLaboratoryForm = this.formBuilder.group({
     
  id : [0],
  machineCode : [this.selectedMachineLinkedToTheLaboratory.machineCode, [ Validators.required ]],
  machineName : [this.selectedMachineLinkedToTheLaboratory.machineName, [ Validators.required ]],
  laboratoryCode : [this.selectedMachineLinkedToTheLaboratory.laboratoryCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.machineLinkedToTheLaboratoryService.create(this.machineLinkedToTheLaboratoryForm.value)
        .pipe(switchMap(x => {
			return this.machineLinkedToTheLaboratoryService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.machineLinkedToTheLaboratoryForm.get(name);
    }

  initializeLookupServices() {
    this.laboratoriesService = new LookupService('laboratories', this.http);
  }
 }
