import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LookupService } from '../lookup.service';
import { LookupModel } from 'app/shared/models/controls/lookup.model';

@Component({
  selector: 'app-lookup-new',
  templateUrl: './lookup-new.component.html',
  styleUrls: ['./lookup-new.component.scss']
})
export class LookupNewComponent extends AppBaseComponent implements OnInit {

  @Input() input: any;
  @Input() lookupServiceName: string;
  @Input() lookupLabel: string;
  lookupForm: FormGroup;
  instanceService: LookupService;

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLookupDialog: any,
    @Optional() public dialogRef: MatDialogRef<LookupNewComponent>) {
    super(injector);
  }

  ngOnInit() {
    // Check Inputs from route data
    console.log(this.selectedLookupDialog);
    this.input = this.selectedLookupDialog.data;
    const lookupServiceName = this.activatedRoute.snapshot.data.lookupServiceName;
    const lookupLabel = this.activatedRoute.snapshot.data.lookupLabel;
    if (lookupServiceName) {
      this.lookupServiceName = lookupServiceName;
      this.lookupLabel = lookupLabel;
    } else {
      this.lookupServiceName = this.input.lookupServiceName;
      this.lookupLabel = this.input.lookupLabel;
    }
    // ----
    this.instanceService = new LookupService(this.lookupServiceName, this.http);
    this.lookupForm = this.formBuilder.group({
      id: [0],
      code: [, [Validators.required]],
      name: [, [Validators.required]]
    });



  }
  onSubmit() {
    this.instanceService.create(this.lookupForm.value).subscribe(
      (result) => {
        if (this.dialogRef) {
          this.dialogRef.close(true);
        } else {
          this.onBack();
        }
      });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  getControls(name: string) {
    return this.lookupForm.get(name);
  }
}

