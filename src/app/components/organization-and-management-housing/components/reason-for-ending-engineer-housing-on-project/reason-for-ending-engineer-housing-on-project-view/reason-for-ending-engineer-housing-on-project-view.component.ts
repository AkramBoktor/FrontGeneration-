
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ReasonForEndingEngineerHousingOnProject } from 'app/shared/models/reason-for-ending-engineer-housing-on-project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ReasonForEndingEngineerHousingOnProjectService } from '../shared/reason-for-ending-engineer-housing-on-project.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-reason-for-ending-engineer-housing-on-project-view',
  templateUrl: './reason-for-ending-engineer-housing-on-project-view.component.html',
  styleUrls: ['./reason-for-ending-engineer-housing-on-project-view.component.scss'],
  providers: []
})

export class ReasonForEndingEngineerHousingOnProjectViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReasonForEndingEngineerHousingOnProject: ReasonForEndingEngineerHousingOnProject;
  reasonForEndingEngineerHousingOnProjectForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReasonForEndingEngineerHousingOnProjectDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReasonForEndingEngineerHousingOnProjectViewComponent>,
    public reasonForEndingEngineerHousingOnProjectService: ReasonForEndingEngineerHousingOnProjectService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReasonForEndingEngineerHousingOnProject = this.selectedReasonForEndingEngineerHousingOnProjectDialog.data || this.selectedReasonForEndingEngineerHousingOnProject;

    

    this.reasonForEndingEngineerHousingOnProjectForm = this.formBuilder.group({
      
  terminateResonCode : [this.selectedReasonForEndingEngineerHousingOnProject.terminateResonCode],
  terminateReson : [this.selectedReasonForEndingEngineerHousingOnProject.terminateReson]
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
    return this.reasonForEndingEngineerHousingOnProjectForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.reasonForEndingEngineerHousingOnProjectForm.controls)) {
      this.reasonForEndingEngineerHousingOnProjectForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

