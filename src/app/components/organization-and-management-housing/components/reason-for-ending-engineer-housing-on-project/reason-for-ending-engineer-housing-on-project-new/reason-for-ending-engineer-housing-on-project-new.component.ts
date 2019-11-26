
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ReasonForEndingEngineerHousingOnProject } from 'app/shared/models/reason-for-ending-engineer-housing-on-project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ReasonForEndingEngineerHousingOnProjectService } from '../shared/reason-for-ending-engineer-housing-on-project.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-reason-for-ending-engineer-housing-on-project-new',
  templateUrl: './reason-for-ending-engineer-housing-on-project-new.component.html',
  styleUrls: ['./reason-for-ending-engineer-housing-on-project-new.component.scss'],
  providers: [
    ]
})

export class ReasonForEndingEngineerHousingOnProjectNewComponent extends AppBaseComponent implements OnInit {
  reasonForEndingEngineerHousingOnProjectForm: FormGroup;
  @Input() selectedReasonForEndingEngineerHousingOnProject: ReasonForEndingEngineerHousingOnProject;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ReasonForEndingEngineerHousingOnProjectNewComponent>,
    public reasonForEndingEngineerHousingOnProjectService: ReasonForEndingEngineerHousingOnProjectService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReasonForEndingEngineerHousingOnProject = new ReasonForEndingEngineerHousingOnProject();

    

    this.reasonForEndingEngineerHousingOnProjectForm = this.formBuilder.group({
     
  id : [0],
  terminateResonCode : [this.selectedReasonForEndingEngineerHousingOnProject.terminateResonCode, [ Validators.required ]],
  terminateReson : [this.selectedReasonForEndingEngineerHousingOnProject.terminateReson, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.reasonForEndingEngineerHousingOnProjectService.create(this.reasonForEndingEngineerHousingOnProjectForm.value)
        .pipe(switchMap(x => {
			return this.reasonForEndingEngineerHousingOnProjectService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.reasonForEndingEngineerHousingOnProjectForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
