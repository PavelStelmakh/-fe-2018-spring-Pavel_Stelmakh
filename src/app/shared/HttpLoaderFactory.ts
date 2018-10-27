import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient, BASE_URL: string) {
    return new TranslateHttpLoader(http, `${BASE_URL}/assets/i18n/`);
}