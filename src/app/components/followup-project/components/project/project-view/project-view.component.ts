
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { Project } from 'app/shared/models/project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss'],
  providers: []
})

export class ProjectViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedProject: Project;
  projectForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedProjectDialog: any,
    @Optional() public dialogRef: MatDialogRef<ProjectViewComponent>,
    public projectService: ProjectService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProject = this.selectedProjectDialog.data || this.selectedProject;

    

    this.projectForm = this.formBuilder.group({
      
  projectCode : [this.selectedProject.projectCode],
  projectDesc : [this.selectedProject.projectDesc]
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
    return this.projectForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.projectForm.controls)) {
      this.projectForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

