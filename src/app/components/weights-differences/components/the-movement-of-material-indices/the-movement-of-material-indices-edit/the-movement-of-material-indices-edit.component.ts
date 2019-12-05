
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TheMovementOfMaterialIndices } from 'app/shared/models/the-movement-of-material-indices';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TheMovementOfMaterialIndicesService } from '../shared/the-movement-of-material-indices.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-movement-of-material-indices-edit',
  templateUrl: './the-movement-of-material-indices-edit.component.html',
  styleUrls: ['./the-movement-of-material-indices-edit.component.scss'],
  providers: []
})

export class TheMovementOfMaterialIndicesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTheMovementOfMaterialIndices: TheMovementOfMaterialIndices;
  theMovementOfMaterialIndicesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private elementsService: LookupService;

  
elementCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('elementCode', { static: true }) ElementCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTheMovementOfMaterialIndicesDialog: any,
    @Optional() public dialogRef: MatDialogRef<TheMovementOfMaterialIndicesEditComponent>,
    public theMovementOfMaterialIndicesService: TheMovementOfMaterialIndicesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheMovementOfMaterialIndices = new TheMovementOfMaterialIndices();
    this.selectedTheMovementOfMaterialIndices = this.selectedTheMovementOfMaterialIndicesDialog.data || this.selectedTheMovementOfMaterialIndices;

    
	this.elementCodeSelectOptions = new MaterialSelectOptions({
	 data: this.elementsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود العنصر',
	});


    this.theMovementOfMaterialIndicesForm = this.formBuilder.group({
      
  id : [this.selectedTheMovementOfMaterialIndices.id],
  startDateForMovement : [this.selectedTheMovementOfMaterialIndices.startDateForMovement, [ Validators.required ]],
  endDateForMovement : [this.selectedTheMovementOfMaterialIndices.endDateForMovement, [ Validators.required ]],
  standardNumber : [this.selectedTheMovementOfMaterialIndices.standardNumber, [ Validators.required ]],
  elementCode : [this.selectedTheMovementOfMaterialIndices.elementCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.theMovementOfMaterialIndicesService.update(this.theMovementOfMaterialIndicesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.theMovementOfMaterialIndicesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.theMovementOfMaterialIndicesForm.get(name);
  }

  initializeLookupServices() {
    this.elementsService = new LookupService('elements', this.http);
  }
}
