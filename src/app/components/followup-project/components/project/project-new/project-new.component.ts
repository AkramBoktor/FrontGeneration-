
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Project } from 'app/shared/models/project';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProjectService } from '../shared/project.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss'],
  providers: [
    ]
})

export class ProjectNewComponent extends AppBaseComponent implements OnInit {
  projectForm: FormGroup;
  @Input() selectedProject: Project;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ProjectNewComponent>,
    public projectService: ProjectService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProject = new Project();

    

    this.projectForm = this.formBuilder.group({
     
  id : [0],
  projectCode : [this.selectedProject.projectCode, [ Validators.required ]],
  projectDesc : [this.selectedProject.projectDesc, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.projectService.create(this.projectForm.value)
        .pipe(switchMap(x => {
			return this.projectService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.projectForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
