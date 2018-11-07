import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store, select } from '@ngrx/store';
import * as langAction from './actions/language.action';
import * as language from './reducers/language.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private translate: TranslateService, private store: Store<language.State>) {}

  ngOnInit() {
    this.store.pipe(select(language.getLang)).subscribe((lang: string) => this.translate.use(lang));
  }

  switchLang(lang: string) {
    this.store.dispatch(new langAction.SelectAction(lang));
  }

}
