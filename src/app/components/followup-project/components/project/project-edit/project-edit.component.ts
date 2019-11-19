
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Project } from 'app/shared/models/project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ProjectService } from '../shared/project.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss'],
  providers: []
})

export class ProjectEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedProject: Project;
  projectForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedProjectDialog: any,
    @Optional() public dialogRef: MatDialogRef<ProjectEditComponent>,
    public projectService: ProjectService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProject = new Project();
    this.selectedProject = this.selectedProjectDialog.data || this.selectedProject;

    

    this.projectForm = this.formBuilder.group({
      
  id : [this.selectedProject.id],
  projectCode : [this.selectedProject.projectCode, [ Validators.required ]],
  projectDesc : [this.selectedProject.projectDesc, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.projectService.update(this.projectForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.projectService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.projectForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
