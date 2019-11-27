
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AdjustThePositionOfProjects } from 'app/shared/models/adjust-the-position-of-projects';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AdjustThePositionOfProjectsService } from '../shared/adjust-the-position-of-projects.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-adjust-the-position-of-projects-edit',
  templateUrl: './adjust-the-position-of-projects-edit.component.html',
  styleUrls: ['./adjust-the-position-of-projects-edit.component.scss'],
  providers: []
})

export class AdjustThePositionOfProjectsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAdjustThePositionOfProjects: AdjustThePositionOfProjects;
  adjustThePositionOfProjectsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAdjustThePositionOfProjectsDialog: any,
    @Optional() public dialogRef: MatDialogRef<AdjustThePositionOfProjectsEditComponent>,
    public adjustThePositionOfProjectsService: AdjustThePositionOfProjectsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAdjustThePositionOfProjects = new AdjustThePositionOfProjects();
    this.selectedAdjustThePositionOfProjects = this.selectedAdjustThePositionOfProjectsDialog.data || this.selectedAdjustThePositionOfProjects;

    
	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفروع ',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});


    this.adjustThePositionOfProjectsForm = this.formBuilder.group({
      
  id : [this.selectedAdjustThePositionOfProjects.id],
  buildingNumber : [this.selectedAdjustThePositionOfProjects.buildingNumber, [ Validators.required ]],
  entryDate : [this.selectedAdjustThePositionOfProjects.entryDate, [ Validators.required ]],
  extensionCode : [this.selectedAdjustThePositionOfProjects.extensionCode, [ Validators.required ]],
  pLanYear : [this.selectedAdjustThePositionOfProjects.pLanYear, [ Validators.required ]],
  positionCode : [this.selectedAdjustThePositionOfProjects.positionCode, [ Validators.required ]],
  branch : [this.selectedAdjustThePositionOfProjects.branch, [ Validators.required ]],
  constructionType : [this.selectedAdjustThePositionOfProjects.constructionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.adjustThePositionOfProjectsService.update(this.adjustThePositionOfProjectsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.adjustThePositionOfProjectsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.adjustThePositionOfProjectsForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
}
