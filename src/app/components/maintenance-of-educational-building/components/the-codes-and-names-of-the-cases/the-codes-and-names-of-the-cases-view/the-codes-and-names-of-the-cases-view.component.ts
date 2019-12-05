
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TheCodesAndNamesOfTheCases } from 'app/shared/models/the-codes-and-names-of-the-cases';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TheCodesAndNamesOfTheCasesService } from '../shared/the-codes-and-names-of-the-cases.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-the-codes-and-names-of-the-cases-view',
  templateUrl: './the-codes-and-names-of-the-cases-view.component.html',
  styleUrls: ['./the-codes-and-names-of-the-cases-view.component.scss'],
  providers: []
})

export class TheCodesAndNamesOfTheCasesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheCodesAndNamesOfTheCases: TheCodesAndNamesOfTheCases;
  theCodesAndNamesOfTheCasesForm: FormGroup;

  private statusCodesService: LookupService;

  
statusCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheCodesAndNamesOfTheCasesDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheCodesAndNamesOfTheCasesViewComponent>,
    public theCodesAndNamesOfTheCasesService: TheCodesAndNamesOfTheCasesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheCodesAndNamesOfTheCases = this.selectedTheCodesAndNamesOfTheCasesDialog.data || this.selectedTheCodesAndNamesOfTheCases;

    
	this.statusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الحاله ',
	});


    this.theCodesAndNamesOfTheCasesForm = this.formBuilder.group({
      
  statusName : [this.selectedTheCodesAndNamesOfTheCases.statusName],
  statusCode : [this.selectedTheCodesAndNamesOfTheCases.statusCode]
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
    return this.theCodesAndNamesOfTheCasesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.theCodesAndNamesOfTheCasesForm.controls)) {
      this.theCodesAndNamesOfTheCasesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.statusCodesService = new LookupService('statuscodes', this.http);
  }
}

