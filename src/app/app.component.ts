import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RetrospectiveService } from './shared/services/retrospective.service';
import { SnackbarService } from './shared/services/snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'retrospective-builder';
  data: any;
  whatWellWent: any[] = [];
  deletedWhatWellWent: any[] = [];
  opportunityToImprove: any[] = [];
  deletedOpportunityToImprove: any[] = [];
  questions: any[] = [];
  deletedQuestions: any[] = [];
  suggestions: any[] = [];
  deletedSuggestions: any[] = [];
  fields: any = [
    { id: 1, placeholder: 'What went well' },
    { id: 2, placeholder: 'Opportunity To Improve' },
    { id: 3, placeholder: 'Question' },
    { id: 4, placeholder: 'Suggestion' }
  ];
  constructor(
    private retrospectiveService: RetrospectiveService,
    private snackBarService: SnackbarService
  ) {

  }
  ngOnInit() {
    // const id = 'c1f07650-3867-11ea-b81a-2d35931d8442';
    // if (id) {
    //   this.getRetrospective(id);
    // }
    this.getAll();
  }


  removeChip(data, id) {
    switch (id) {
      case 0:
        if (data.id) {
          this.deletedWhatWellWent.push(data.id);
          this.whatWellWent = this.whatWellWent.filter(el => el.name !== data.name);
        } else {
          this.whatWellWent = this.whatWellWent.filter(el => el.name !== data.name);
        }
        break;
      case 1:
        if (data.id) {
          this.deletedOpportunityToImprove.push(data.id);
        } else {
          this.opportunityToImprove = this.opportunityToImprove.filter(el => el !== data);
        }
        break;
      case 2:
        if (data.id) {
          this.deletedQuestions.push(data.id);
        } else {
          this.questions = this.questions.filter(el => el.name !== data.name);
        }
        break;
      case 3:
        if (data.id) {
          this.deletedSuggestions.push(data.id);
        } else {
          this.suggestions = this.suggestions.filter(el => el.name !== data.name);
        }
        break;
    }
  }

  onButtonClicked(data) {
    const object = {
      name: data.value
    };
    switch (data.id) {
      case 1:
        this.whatWellWent.push(object);
        break;
      case 2:
        this.opportunityToImprove.push(object);
        break;
      case 3:
        this.questions.push(object);
        break;
      case 4:
        this.suggestions.push(object);
        break;
    }
  }

  removeFormControl(name) {
    // this.formGroup.removeControl(name);
  }

  disableButton() {
      if (this.whatWellWent && this.whatWellWent.length === 0 && this.opportunityToImprove && this.opportunityToImprove.length === 0 && this.questions && this.questions.length === 0 && this.suggestions  && this.suggestions.length === 0 ) {
          return true;
      } else {
        return false;
      }
  }

  submit() {
    const payload = {
      whatWellWent: this.whatWellWent.length > 0 ? this.whatWellWent : [],
      opportunityToImprove: this.opportunityToImprove.length > 0 ? this.opportunityToImprove : [],
      questions: this.questions.length > 0 ? this.questions : [],
      suggestions: this.suggestions.length > 0 ? this.suggestions : []
    };

    if (this.data) {
      payload['deletedwhatwellwent'] = this.deletedWhatWellWent;
      payload['deletedOpportunityToImprove'] = this.deletedOpportunityToImprove;
      payload['deletedQuestions'] = this.deletedQuestions;
      payload['deletedSuggestions'] = this.deletedSuggestions;
      const payload2 = {
        id : this.data.id,
        retrospective: payload
      };
      this.retrospectiveService.edit(payload2).subscribe(response => {
        if (response) {
          this.snackBarService.open('Saved Successfully');
          this.reset();
        } else {
          this.snackBarService.open('Error occured while saving...');
        }
      });
    } else {
      this.retrospectiveService.add({retrospective: payload}).subscribe(response => {
        if (response) {
          this.snackBarService.open('Added Successfully');
          this.reset();
        } else {
          this.snackBarService.open('Error occured while saving...');
        }
      });
    }
  }

  getRetrospective(id) {
    this.retrospectiveService.get(id).subscribe(response => {
      if (response) {
        console.log(response);
          this.data = response;
          this.whatWellWent = response.whatwentwells;
          this.opportunityToImprove = response.opportunitiestoimproves;
          this.questions = response.questions;
          this.suggestions = response.suggestions;
      }
    });
  }

  reset() {
    this.whatWellWent = [];
    this.opportunityToImprove = [];
    this.questions = [];
    this.suggestions = [];
    this.getAll();
  }

  getAll() {
    this.retrospectiveService.getAll().subscribe(response => {
      if (response) {
          console.log(response);
          this.data = response.rows[0];
          this.whatWellWent = this.data.whatwentwells;
          this.opportunityToImprove = this.data.opportunitiestoimproves;
          this.questions = this.data.questions;
          this.suggestions = this.data.suggestions;
      }
    });
  }

}
