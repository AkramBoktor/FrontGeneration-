
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TheCodesAndNamesOfTheCases } from 'app/shared/models/the-codes-and-names-of-the-cases';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TheCodesAndNamesOfTheCasesService } from '../shared/the-codes-and-names-of-the-cases.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-codes-and-names-of-the-cases-edit',
  templateUrl: './the-codes-and-names-of-the-cases-edit.component.html',
  styleUrls: ['./the-codes-and-names-of-the-cases-edit.component.scss'],
  providers: []
})

export class TheCodesAndNamesOfTheCasesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheCodesAndNamesOfTheCases: TheCodesAndNamesOfTheCases;
  theCodesAndNamesOfTheCasesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private statusCodesService: LookupService;

  
statusCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('statusCode', { static: true }) StatusCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheCodesAndNamesOfTheCasesDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheCodesAndNamesOfTheCasesEditComponent>,
    public theCodesAndNamesOfTheCasesService: TheCodesAndNamesOfTheCasesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheCodesAndNamesOfTheCases = new TheCodesAndNamesOfTheCases();
    this.selectedTheCodesAndNamesOfTheCases = this.selectedTheCodesAndNamesOfTheCasesDialog.data || this.selectedTheCodesAndNamesOfTheCases;

    
	this.statusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.statusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' كود الحاله ',
	});


    this.theCodesAndNamesOfTheCasesForm = this.formBuilder.group({
      
  id : [this.selectedTheCodesAndNamesOfTheCases.id],
  statusName : [this.selectedTheCodesAndNamesOfTheCases.statusName, [ Validators.required ]],
  statusCode : [this.selectedTheCodesAndNamesOfTheCases.statusCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.theCodesAndNamesOfTheCasesService.update(this.theCodesAndNamesOfTheCasesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.theCodesAndNamesOfTheCasesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.theCodesAndNamesOfTheCasesForm.get(name);
  }

  initializeLookupServices() {
    this.statusCodesService = new LookupService('statuscodes', this.http);
  }
}
