
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ProjectData } from 'app/shared/models/project-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ProjectDataService } from '../shared/project-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-data-new',
  templateUrl: './project-data-new.component.html',
  styleUrls: ['./project-data-new.component.scss'],
  providers: [
    ]
})

export class ProjectDataNewComponent extends AppBaseComponent implements OnInit {
  projectDataForm: FormGroup;
  @Input() selectedProjectData: ProjectData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ProjectDataNewComponent>,
    public projectDataService: ProjectDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProjectData = new ProjectData();

    

    this.projectDataForm = this.formBuilder.group({
     
  id : [0],
  projectCode : [this.selectedProjectData.projectCode, [ Validators.required ]],
  projectName : [this.selectedProjectData.projectName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.projectDataService.create(this.projectDataForm.value)
        .pipe(switchMap(x => {
			return this.projectDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.projectDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
