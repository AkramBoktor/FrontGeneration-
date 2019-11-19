
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { SmoothData } from 'app/shared/models/smooth-data';
import { switchMap } from 'rxjs/operators';
import { SmoothDataService } from '../shared/smooth-data.service';




@Component({
  selector: 'app-smooth-data-edit',
  templateUrl: './smooth-data-edit.component.html',
  styleUrls: ['./smooth-data-edit.component.scss'],
  providers: []
})

export class SmoothDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedSmoothData: SmoothData;
  smoothDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedSmoothDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<SmoothDataEditComponent>,
    public smoothDataService: SmoothDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedSmoothData = new SmoothData();
    this.selectedSmoothData = this.selectedSmoothDataDialog.data || this.selectedSmoothData;

    

    this.smoothDataForm = this.formBuilder.group({
      
  id : [this.selectedSmoothData.id],
  seriesCode : [this.selectedSmoothData.seriesCode, [ Validators.required ]],
  seriesTitle : [this.selectedSmoothData.seriesTitle, [ Validators.required ]],
  bookNumber : [this.selectedSmoothData.bookNumber, [ Validators.required ]],
  bookTitle : [this.selectedSmoothData.bookTitle, [ Validators.required ]],
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.smoothDataService.update(this.smoothDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.smoothDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.smoothDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
