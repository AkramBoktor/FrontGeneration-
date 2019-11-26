
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReasonForEndingEngineerHousingOnProject } from 'app/shared/models/reason-for-ending-engineer-housing-on-project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ReasonForEndingEngineerHousingOnProjectService } from '../shared/reason-for-ending-engineer-housing-on-project.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-reason-for-ending-engineer-housing-on-project-edit',
  templateUrl: './reason-for-ending-engineer-housing-on-project-edit.component.html',
  styleUrls: ['./reason-for-ending-engineer-housing-on-project-edit.component.scss'],
  providers: []
})

export class ReasonForEndingEngineerHousingOnProjectEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReasonForEndingEngineerHousingOnProject: ReasonForEndingEngineerHousingOnProject;
  reasonForEndingEngineerHousingOnProjectForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReasonForEndingEngineerHousingOnProjectDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReasonForEndingEngineerHousingOnProjectEditComponent>,
    public reasonForEndingEngineerHousingOnProjectService: ReasonForEndingEngineerHousingOnProjectService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReasonForEndingEngineerHousingOnProject = new ReasonForEndingEngineerHousingOnProject();
    this.selectedReasonForEndingEngineerHousingOnProject = this.selectedReasonForEndingEngineerHousingOnProjectDialog.data || this.selectedReasonForEndingEngineerHousingOnProject;

    

    this.reasonForEndingEngineerHousingOnProjectForm = this.formBuilder.group({
      
  id : [this.selectedReasonForEndingEngineerHousingOnProject.id],
  terminateResonCode : [this.selectedReasonForEndingEngineerHousingOnProject.terminateResonCode, [ Validators.required ]],
  terminateReson : [this.selectedReasonForEndingEngineerHousingOnProject.terminateReson, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.reasonForEndingEngineerHousingOnProjectService.update(this.reasonForEndingEngineerHousingOnProjectForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.reasonForEndingEngineerHousingOnProjectService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.reasonForEndingEngineerHousingOnProjectForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
