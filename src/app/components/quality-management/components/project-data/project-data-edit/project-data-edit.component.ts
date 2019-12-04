
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ProjectData } from 'app/shared/models/project-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ProjectDataService } from '../shared/project-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-data-edit',
  templateUrl: './project-data-edit.component.html',
  styleUrls: ['./project-data-edit.component.scss'],
  providers: []
})

export class ProjectDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedProjectData: ProjectData;
  projectDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedProjectDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ProjectDataEditComponent>,
    public projectDataService: ProjectDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedProjectData = new ProjectData();
    this.selectedProjectData = this.selectedProjectDataDialog.data || this.selectedProjectData;

    

    this.projectDataForm = this.formBuilder.group({
      
  id : [this.selectedProjectData.id],
  projectCode : [this.selectedProjectData.projectCode, [ Validators.required ]],
  projectName : [this.selectedProjectData.projectName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.projectDataService.update(this.projectDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.projectDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.projectDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
