
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EndingPlacementOfExecutiveEngineer } from 'app/shared/models/ending-placement-of-executive-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EndingPlacementOfExecutiveEngineerService } from '../shared/ending-placement-of-executive-engineer.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-ending-placement-of-executive-engineer-view',
  templateUrl: './ending-placement-of-executive-engineer-view.component.html',
  styleUrls: ['./ending-placement-of-executive-engineer-view.component.scss'],
  providers: []
})

export class EndingPlacementOfExecutiveEngineerViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndingPlacementOfExecutiveEngineer: EndingPlacementOfExecutiveEngineer;
  endingPlacementOfExecutiveEngineerForm: FormGroup;

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private endingSupervisionReasonsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
supervisionEndResonSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndingPlacementOfExecutiveEngineerDialog: any,
    @Optional() public dialogRef: MatDialogRef<EndingPlacementOfExecutiveEngineerViewComponent>,
    public endingPlacementOfExecutiveEngineerService: EndingPlacementOfExecutiveEngineerService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndingPlacementOfExecutiveEngineer = this.selectedEndingPlacementOfExecutiveEngineerDialog.data || this.selectedEndingPlacementOfExecutiveEngineer;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.supervisionEndResonSelectOptions = new MaterialSelectOptions({
	 data: this.endingSupervisionReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود سبب انهاء الاشراف',
	});


    this.endingPlacementOfExecutiveEngineerForm = this.formBuilder.group({
      
  executiveEngineerNumber : [this.selectedEndingPlacementOfExecutiveEngineer.executiveEngineerNumber],
  schoolNumber : [this.selectedEndingPlacementOfExecutiveEngineer.schoolNumber],
  atthachEngineerNumber : [this.selectedEndingPlacementOfExecutiveEngineer.atthachEngineerNumber],
  yearPlan : [this.selectedEndingPlacementOfExecutiveEngineer.yearPlan],
  bidNumber : [this.selectedEndingPlacementOfExecutiveEngineer.bidNumber],
  supervisionBeginningDate : [this.selectedEndingPlacementOfExecutiveEngineer.supervisionBeginningDate],
  supervisionEndDate : [this.selectedEndingPlacementOfExecutiveEngineer.supervisionEndDate],
  branchCode : [this.selectedEndingPlacementOfExecutiveEngineer.branchCode],
  constructionType : [this.selectedEndingPlacementOfExecutiveEngineer.constructionType],
  offeringType : [this.selectedEndingPlacementOfExecutiveEngineer.offeringType],
  supervisionEndReson : [this.selectedEndingPlacementOfExecutiveEngineer.supervisionEndReson]
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
    return this.endingPlacementOfExecutiveEngineerForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.endingPlacementOfExecutiveEngineerForm.controls)) {
      this.endingPlacementOfExecutiveEngineerForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.endingSupervisionReasonsService = new LookupService('endingsupervisionreasons', this.http);
  }
}

