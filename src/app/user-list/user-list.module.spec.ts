import { ComboboxModule } from './user-list.module';

describe('ComboboxModule', () => {
  let comboboxModule: ComboboxModule;

  beforeEach(() => {
    comboboxModule = new ComboboxModule();
  });

  it('should create an instance', () => {
    expect(comboboxModule).toBeTruthy();
  });
});
