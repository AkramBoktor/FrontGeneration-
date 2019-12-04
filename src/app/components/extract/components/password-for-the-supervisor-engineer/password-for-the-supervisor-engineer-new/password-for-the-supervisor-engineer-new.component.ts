
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PasswordForTheSupervisorEngineer } from 'app/shared/models/password-for-the-supervisor-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PasswordForTheSupervisorEngineerService } from '../shared/password-for-the-supervisor-engineer.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-password-for-the-supervisor-engineer-new',
  templateUrl: './password-for-the-supervisor-engineer-new.component.html',
  styleUrls: ['./password-for-the-supervisor-engineer-new.component.scss'],
  providers: [
    ]
})

export class PasswordForTheSupervisorEngineerNewComponent extends AppBaseComponent implements OnInit {
  passwordForTheSupervisorEngineerForm: FormGroup;
  @Input() selectedPasswordForTheSupervisorEngineer: PasswordForTheSupervisorEngineer;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PasswordForTheSupervisorEngineerNewComponent>,
    public passwordForTheSupervisorEngineerService: PasswordForTheSupervisorEngineerService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPasswordForTheSupervisorEngineer = new PasswordForTheSupervisorEngineer();

    

    this.passwordForTheSupervisorEngineerForm = this.formBuilder.group({
     
  id : [0],
  specializedEngineerNumber : [this.selectedPasswordForTheSupervisorEngineer.specializedEngineerNumber, [ Validators.required ]],
  password : [this.selectedPasswordForTheSupervisorEngineer.password, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.passwordForTheSupervisorEngineerService.create(this.passwordForTheSupervisorEngineerForm.value)
        .pipe(switchMap(x => {
			return this.passwordForTheSupervisorEngineerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.passwordForTheSupervisorEngineerForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
