
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MachineRelatedTest } from 'app/shared/models/machine-related-test';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MachineRelatedTestService } from '../shared/machine-related-test.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-machine-related-test-new',
  templateUrl: './machine-related-test-new.component.html',
  styleUrls: ['./machine-related-test-new.component.scss'],
  providers: [
    ]
})

export class MachineRelatedTestNewComponent extends AppBaseComponent implements OnInit {
  machineRelatedTestForm: FormGroup;
  @Input() selectedMachineRelatedTest: MachineRelatedTest;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MachineRelatedTestNewComponent>,
    public machineRelatedTestService: MachineRelatedTestService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMachineRelatedTest = new MachineRelatedTest();

    

    this.machineRelatedTestForm = this.formBuilder.group({
     
  id : [0],
  machineCode : [this.selectedMachineRelatedTest.machineCode, [ Validators.required ]],
  testCode : [this.selectedMachineRelatedTest.testCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.machineRelatedTestService.create(this.machineRelatedTestForm.value)
        .pipe(switchMap(x => {
			return this.machineRelatedTestService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.machineRelatedTestForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
