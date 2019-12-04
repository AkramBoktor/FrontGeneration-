
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReportOnTheResistanceOfReinforcedConcrete } from 'app/shared/models/report-on-the-resistance-of-reinforced-concrete';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ReportOnTheResistanceOfReinforcedConcreteService } from '../shared/report-on-the-resistance-of-reinforced-concrete.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-report-on-the-resistance-of-reinforced-concrete-edit',
  templateUrl: './report-on-the-resistance-of-reinforced-concrete-edit.component.html',
  styleUrls: ['./report-on-the-resistance-of-reinforced-concrete-edit.component.scss'],
  providers: []
})

export class ReportOnTheResistanceOfReinforcedConcreteEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReportOnTheResistanceOfReinforcedConcrete: ReportOnTheResistanceOfReinforcedConcrete;
  reportOnTheResistanceOfReinforcedConcreteForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private elementsService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
structuralComponentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('sectionCenter', { static: true }) SectionCenterSelectComponent: MaterialSelectComponent;
	@ViewChild('village', { static: true }) VillageSelectComponent: MaterialSelectComponent;
	@ViewChild('educationalAdministration', { static: true }) EducationalAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('structuralComponent', { static: true }) StructuralComponentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReportOnTheResistanceOfReinforcedConcreteDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReportOnTheResistanceOfReinforcedConcreteEditComponent>,
    public reportOnTheResistanceOfReinforcedConcreteService: ReportOnTheResistanceOfReinforcedConcreteService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReportOnTheResistanceOfReinforcedConcrete = new ReportOnTheResistanceOfReinforcedConcrete();
    this.selectedReportOnTheResistanceOfReinforcedConcrete = this.selectedReportOnTheResistanceOfReinforcedConcreteDialog.data || this.selectedReportOnTheResistanceOfReinforcedConcrete;

    
	this.sectionCenterSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم/المركز',
	});

	this.villageSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القرية/الشياخة',
	});

	this.educationalAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة التعليمية',
	});

	this.structuralComponentSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'العنصر الإنشائي',
	});


    this.reportOnTheResistanceOfReinforcedConcreteForm = this.formBuilder.group({
      
  id : [this.selectedReportOnTheResistanceOfReinforcedConcrete.id],
  buildingCode : [this.selectedReportOnTheResistanceOfReinforcedConcrete.buildingCode, [ Validators.required ]],
  schoolAddress : [this.selectedReportOnTheResistanceOfReinforcedConcrete.schoolAddress, [ ]],
  previewDate : [this.selectedReportOnTheResistanceOfReinforcedConcrete.previewDate, [ ]],
  startDate : [this.selectedReportOnTheResistanceOfReinforcedConcrete.startDate, [ ]],
  endDate : [this.selectedReportOnTheResistanceOfReinforcedConcrete.endDate, [ ]],
  extensionNumber : [this.selectedReportOnTheResistanceOfReinforcedConcrete.extensionNumber, [ Validators.required ]],
  sampleNumber : [this.selectedReportOnTheResistanceOfReinforcedConcrete.sampleNumber, [ Validators.required ]],
  testDate : [this.selectedReportOnTheResistanceOfReinforcedConcrete.testDate, [ Validators.required ]],
  sectionCenter : [this.selectedReportOnTheResistanceOfReinforcedConcrete.sectionCenter, [ Validators.required ]],
  village : [this.selectedReportOnTheResistanceOfReinforcedConcrete.village, [ Validators.required ]],
  educationalAdministration : [this.selectedReportOnTheResistanceOfReinforcedConcrete.educationalAdministration, [ Validators.required ]],
  structuralComponent : [this.selectedReportOnTheResistanceOfReinforcedConcrete.structuralComponent, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.reportOnTheResistanceOfReinforcedConcreteService.update(this.reportOnTheResistanceOfReinforcedConcreteForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.reportOnTheResistanceOfReinforcedConcreteService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.reportOnTheResistanceOfReinforcedConcreteForm.get(name);
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}
