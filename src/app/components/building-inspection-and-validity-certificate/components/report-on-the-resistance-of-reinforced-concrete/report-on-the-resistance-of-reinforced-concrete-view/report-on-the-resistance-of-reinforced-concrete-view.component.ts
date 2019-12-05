
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ReportOnTheResistanceOfReinforcedConcrete } from 'app/shared/models/report-on-the-resistance-of-reinforced-concrete';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ReportOnTheResistanceOfReinforcedConcreteService } from '../shared/report-on-the-resistance-of-reinforced-concrete.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-report-on-the-resistance-of-reinforced-concrete-view',
  templateUrl: './report-on-the-resistance-of-reinforced-concrete-view.component.html',
  styleUrls: ['./report-on-the-resistance-of-reinforced-concrete-view.component.scss'],
  providers: []
})

export class ReportOnTheResistanceOfReinforcedConcreteViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReportOnTheResistanceOfReinforcedConcrete: ReportOnTheResistanceOfReinforcedConcrete;
  reportOnTheResistanceOfReinforcedConcreteForm: FormGroup;

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private areasService: LookupService;
private elementsService: LookupService;

  
sectionCenterSelectOptions: MaterialSelectOptions;
villageSelectOptions: MaterialSelectOptions;
educationalAdministrationSelectOptions: MaterialSelectOptions;
structuralComponentSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReportOnTheResistanceOfReinforcedConcreteDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReportOnTheResistanceOfReinforcedConcreteViewComponent>,
    public reportOnTheResistanceOfReinforcedConcreteService: ReportOnTheResistanceOfReinforcedConcreteService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedReportOnTheResistanceOfReinforcedConcrete.buildingCode],
  schoolAddress : [this.selectedReportOnTheResistanceOfReinforcedConcrete.schoolAddress],
  previewDate : [this.selectedReportOnTheResistanceOfReinforcedConcrete.previewDate],
  startDate : [this.selectedReportOnTheResistanceOfReinforcedConcrete.startDate],
  endDate : [this.selectedReportOnTheResistanceOfReinforcedConcrete.endDate],
  extensionNumber : [this.selectedReportOnTheResistanceOfReinforcedConcrete.extensionNumber],
  sampleNumber : [this.selectedReportOnTheResistanceOfReinforcedConcrete.sampleNumber],
  testDate : [this.selectedReportOnTheResistanceOfReinforcedConcrete.testDate],
  sectionCenter : [this.selectedReportOnTheResistanceOfReinforcedConcrete.sectionCenter],
  village : [this.selectedReportOnTheResistanceOfReinforcedConcrete.village],
  educationalAdministration : [this.selectedReportOnTheResistanceOfReinforcedConcrete.educationalAdministration],
  structuralComponent : [this.selectedReportOnTheResistanceOfReinforcedConcrete.structuralComponent]
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
    return this.reportOnTheResistanceOfReinforcedConcreteForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.reportOnTheResistanceOfReinforcedConcreteForm.controls)) {
      this.reportOnTheResistanceOfReinforcedConcreteForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.areasService = new LookupService('areas', this.http);
this.elementsService = new LookupService('elements', this.http);
  }
}

