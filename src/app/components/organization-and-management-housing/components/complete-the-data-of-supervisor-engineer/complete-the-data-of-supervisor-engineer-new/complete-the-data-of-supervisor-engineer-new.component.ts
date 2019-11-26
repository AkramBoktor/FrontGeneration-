
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { CompleteTheDataOfSupervisorEngineer } from 'app/shared/models/complete-the-data-of-supervisor-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { CompleteTheDataOfSupervisorEngineerService } from '../shared/complete-the-data-of-supervisor-engineer.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-complete-the-data-of-supervisor-engineer-new',
  templateUrl: './complete-the-data-of-supervisor-engineer-new.component.html',
  styleUrls: ['./complete-the-data-of-supervisor-engineer-new.component.scss'],
  providers: [
    ]
})

export class CompleteTheDataOfSupervisorEngineerNewComponent extends AppBaseComponent implements OnInit {
  completeTheDataOfSupervisorEngineerForm: FormGroup;
  @Input() selectedCompleteTheDataOfSupervisorEngineer: CompleteTheDataOfSupervisorEngineer;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<CompleteTheDataOfSupervisorEngineerNewComponent>,
    public completeTheDataOfSupervisorEngineerService: CompleteTheDataOfSupervisorEngineerService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCompleteTheDataOfSupervisorEngineer = new CompleteTheDataOfSupervisorEngineer();

    

    this.completeTheDataOfSupervisorEngineerForm = this.formBuilder.group({
     
  id : [0],
  employeeCode : [this.selectedCompleteTheDataOfSupervisorEngineer.employeeCode, [ Validators.required ]],
  phoneNumber1 : [this.selectedCompleteTheDataOfSupervisorEngineer.phoneNumber1, [ Validators.required ]],
  phoneNumber2 : [this.selectedCompleteTheDataOfSupervisorEngineer.phoneNumber2, [ Validators.required ]],
  phoneNumber3 : [this.selectedCompleteTheDataOfSupervisorEngineer.phoneNumber3, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.completeTheDataOfSupervisorEngineerService.create(this.completeTheDataOfSupervisorEngineerForm.value)
        .pipe(switchMap(x => {
			return this.completeTheDataOfSupervisorEngineerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.completeTheDataOfSupervisorEngineerForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
