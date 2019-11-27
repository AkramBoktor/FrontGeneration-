
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EndingPlacementOfExecutiveEngineer } from 'app/shared/models/ending-placement-of-executive-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EndingPlacementOfExecutiveEngineerService } from '../shared/ending-placement-of-executive-engineer.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-ending-placement-of-executive-engineer-edit',
  templateUrl: './ending-placement-of-executive-engineer-edit.component.html',
  styleUrls: ['./ending-placement-of-executive-engineer-edit.component.scss'],
  providers: []
})

export class EndingPlacementOfExecutiveEngineerEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEndingPlacementOfExecutiveEngineer: EndingPlacementOfExecutiveEngineer;
  endingPlacementOfExecutiveEngineerForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private endingSupervisionReasonsService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
supervisionEndResonSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('supervisionEndReson', { static: true }) SupervisionEndResonSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEndingPlacementOfExecutiveEngineerDialog: any,
    @Optional() public dialogRef: MatDialogRef<EndingPlacementOfExecutiveEngineerEditComponent>,
    public endingPlacementOfExecutiveEngineerService: EndingPlacementOfExecutiveEngineerService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEndingPlacementOfExecutiveEngineer = new EndingPlacementOfExecutiveEngineer();
    this.selectedEndingPlacementOfExecutiveEngineer = this.selectedEndingPlacementOfExecutiveEngineerDialog.data || this.selectedEndingPlacementOfExecutiveEngineer;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
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
      
  id : [this.selectedEndingPlacementOfExecutiveEngineer.id],
  executiveEngineerNumber : [this.selectedEndingPlacementOfExecutiveEngineer.executiveEngineerNumber, [ Validators.required ]],
  schoolNumber : [this.selectedEndingPlacementOfExecutiveEngineer.schoolNumber, [ Validators.required ]],
  atthachEngineerNumber : [this.selectedEndingPlacementOfExecutiveEngineer.atthachEngineerNumber, [ Validators.required ]],
  yearPlan : [this.selectedEndingPlacementOfExecutiveEngineer.yearPlan, [ Validators.required ]],
  bidNumber : [this.selectedEndingPlacementOfExecutiveEngineer.bidNumber, [ Validators.required ]],
  supervisionBeginningDate : [this.selectedEndingPlacementOfExecutiveEngineer.supervisionBeginningDate, [ Validators.required ]],
  supervisionEndDate : [this.selectedEndingPlacementOfExecutiveEngineer.supervisionEndDate, [ Validators.required ]],
  branchCode : [this.selectedEndingPlacementOfExecutiveEngineer.branchCode, [ Validators.required ]],
  constructionType : [this.selectedEndingPlacementOfExecutiveEngineer.constructionType, [ Validators.required ]],
  offeringType : [this.selectedEndingPlacementOfExecutiveEngineer.offeringType, [ Validators.required ]],
  supervisionEndReson : [this.selectedEndingPlacementOfExecutiveEngineer.supervisionEndReson, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.endingPlacementOfExecutiveEngineerService.update(this.endingPlacementOfExecutiveEngineerForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.endingPlacementOfExecutiveEngineerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.endingPlacementOfExecutiveEngineerForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.endingSupervisionReasonsService = new LookupService('endingsupervisionreasons', this.http);
  }
}
