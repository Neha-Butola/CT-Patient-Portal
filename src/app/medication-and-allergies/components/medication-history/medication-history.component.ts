import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchpostService } from '../../services/fetchpost.service';
import { MedicationFormDetails } from '../../model/medication-form-details';
import { MatDialog } from '@angular/material/dialog';
import { EditMedicationComponent } from './modal/edit-medication/edit-medication.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
@Component({
  selector: 'app-medication-history',
  templateUrl: './medication-history.component.html',
  styleUrls: ['./medication-history.component.scss'],
})
export class MedicationHistoryComponent implements OnInit {
  isShown: boolean = false;
  formValue!: FormGroup;
  medicationDetails: any;
  medicationData: {} = {};
  constructor(
    private router: Router,
    private fetchpostservice: FetchpostService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      currentmedication: [],
      otcmedication: [],
      herbsmineralandvitamin: [],
      socialdrug: [],
      pastprescribedmedication: [],
      drugallergies: [],
      reactionother: [],
      // otcmedication: new FormControl(),
      // herbsmineralandvitamin: new FormControl(),
      // socialdrug: new FormControl(),
      // pastprescribedmedication: new FormControl(),
      // drugallergies: new FormControl(),
      // reactionother: new FormControl(),
    });
    this.fetchpostservice.getMedicationData().subscribe(
      (res) => {
        console.log(res);
        this.medicationDetails = res;
      },

      (err) => {}
    );
  }
  deleteMedication(m: any) {
    this.fetchpostservice.deleteMedicationData(m.id).subscribe(
      (res) => {
        location.reload();
      },
      (err) => {}
    );
  }

  // openDialog(m: any): void {
  //   const dialogRef = this.dialog.open(EditMedicationComponent, {
  //     width: '600px',

  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     // if (result) {
  //     //   console.log(result);
  //     //   this.appointments.push(result);
  //     //   this.isData = true;
  //     //   this.table.renderRows();
  //     // }
  //   });
  // }
  openDialog(m: any) {
    this.isShown = !this.isShown;
    console.log(m, 'edit data');

    this.formValue.controls['currentmedication'].setValue(m.currentmedication);
    this.formValue.controls['otcmedication'].setValue(m.otcmedication);
    this.formValue.controls['herbsmineralandvitamin'].setValue(
      m.herbsmineralandvitamin
    );
    this.formValue.controls['socialdrug'].setValue(m.socialdrug);
    this.formValue.controls['drugallergies'].setValue(m.drugallergies);
    this.formValue.controls['reactionother'].setValue(m.reactionother);
    this.formValue.controls['pastprescribedmedication'].setValue(
      m.pastprescribedmedication
    );
    // console.log(m.otcmedication);
  }
  updateMedicationData() {
    console.log(this.medicationDetails);
    this.medicationDetails.currentmedication =
      this.formValue.value.currentmedication;
    this.medicationDetails.otcmedication = this.formValue.value.otcmedication;
    this.medicationDetails.herbsmineralandvitamin =
      this.formValue.value.herbsmineralandvitamin;
    this.medicationDetails.socialdrug = this.formValue.value.socialdrug;
    this.medicationDetails.pastprescribedmedication =
      this.formValue.value.pastprescribedmedication;
    this.medicationDetails.drugallergies = this.formValue.value.drugallergies;
    this.medicationDetails.reactionother = this.formValue.value.reactionother;

    this.fetchpostservice
      .updateMedicationData(this.medicationDetails.id, this.medicationDetails)
      .subscribe(
        (res) => {
          this.medicationDetails = res;
          console.log(res, 'updated');
        },
        (err) => {}
      );
  }
}
