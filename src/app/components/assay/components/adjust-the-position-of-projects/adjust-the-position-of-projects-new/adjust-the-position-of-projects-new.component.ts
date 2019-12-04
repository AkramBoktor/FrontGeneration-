
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AdjustThePositionOfProjects } from 'app/shared/models/adjust-the-position-of-projects';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AdjustThePositionOfProjectsService } from '../shared/adjust-the-position-of-projects.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-adjust-the-position-of-projects-new',
  templateUrl: './adjust-the-position-of-projects-new.component.html',
  styleUrls: ['./adjust-the-position-of-projects-new.component.scss'],
  providers: [
    ]
})

export class AdjustThePositionOfProjectsNewComponent extends AppBaseComponent implements OnInit {
  adjustThePositionOfProjectsForm: FormGroup;
  @Input() selectedAdjustThePositionOfProjects: AdjustThePositionOfProjects;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;

  
branchSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AdjustThePositionOfProjectsNewComponent>,
    public adjustThePositionOfProjectsService: AdjustThePositionOfProjectsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAdjustThePositionOfProjects = new AdjustThePositionOfProjects();

    
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
     
  id : [0],
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
    this.adjustThePositionOfProjectsService.create(this.adjustThePositionOfProjectsForm.value)
        .pipe(switchMap(x => {
			return this.adjustThePositionOfProjectsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.adjustThePositionOfProjectsForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
  }
 }
