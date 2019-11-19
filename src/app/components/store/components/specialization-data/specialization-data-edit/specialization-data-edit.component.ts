
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { SpecializationData } from 'app/shared/models/specialization-data';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { SpecializationDataService } from '../shared/specialization-data.service';




@Component({
  selector: 'app-specialization-data-edit',
  templateUrl: './specialization-data-edit.component.html',
  styleUrls: ['./specialization-data-edit.component.scss'],
  providers: []
})

export class SpecializationDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSpecializationData: SpecializationData;
  specializationDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private areasService: LookupService;

  
administrationOrRegionSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationOrRegion', { static: true }) AdministrationOrRegionSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSpecializationDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<SpecializationDataEditComponent>,
    public specializationDataService: SpecializationDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSpecializationData = new SpecializationData();
    this.selectedSpecializationData = this.selectedSpecializationDataDialog.data || this.selectedSpecializationData;

    
	this.administrationOrRegionSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الادارة او المنطقه',
	});


    this.specializationDataForm = this.formBuilder.group({
      
  id : [this.selectedSpecializationData.id],
  fiscalYear : [this.selectedSpecializationData.fiscalYear, [ Validators.required ]],
  product : [this.selectedSpecializationData.product, [ Validators.required ]],
  allocated : [this.selectedSpecializationData.allocated, [ Validators.required ]],
  spent : [this.selectedSpecializationData.spent, [ Validators.required ]],
  administrationOrRegion : [this.selectedSpecializationData.administrationOrRegion, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.specializationDataService.update(this.specializationDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.specializationDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.specializationDataForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
  }
}
