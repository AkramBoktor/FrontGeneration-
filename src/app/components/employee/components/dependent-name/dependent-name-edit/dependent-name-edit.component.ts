
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DependentName } from 'app/shared/models/dependent-name';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { DependentNameService } from '../shared/dependent-name.service';




@Component({
  selector: 'app-dependent-name-edit',
  templateUrl: './dependent-name-edit.component.html',
  styleUrls: ['./dependent-name-edit.component.scss'],
  providers: []
})

export class DependentNameEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDependentName: DependentName;
  dependentNameForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private relationshipTypesService: LookupService;

  
relationshipTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('relationshipType', { static: true }) RelationshipTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDependentNameDialog: any,
    @Optional() public dialogRef: MatDialogRef<DependentNameEditComponent>,
    public dependentNameService: DependentNameService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDependentName = new DependentName();
    this.selectedDependentName = this.selectedDependentNameDialog.data || this.selectedDependentName;

    
	this.relationshipTypeSelectOptions = new MaterialSelectOptions({
	 data: this.relationshipTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العلاقه',
	});


    this.dependentNameForm = this.formBuilder.group({
      
  id : [this.selectedDependentName.id],
  employeeCode : [this.selectedDependentName.employeeCode, [ Validators.required ]],
  name : [this.selectedDependentName.name, [ Validators.required ]],
  birthDate : [this.selectedDependentName.birthDate, [ Validators.required ]],
  relationshipType : [this.selectedDependentName.relationshipType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.dependentNameService.update(this.dependentNameForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.dependentNameService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.dependentNameForm.get(name);
  }

  initializeLookupServices() {
    this.relationshipTypesService = new LookupService('relationshiptypes', this.http);
  }
}
