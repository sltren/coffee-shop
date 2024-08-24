import { filePreprocessor } from './file-preprocessor';

export const setupNodeEvents = (on: any, config: any) => {
  filePreprocessor(on);

  return config;
};