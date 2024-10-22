import onChange from 'on-change';
import i18next from 'i18next';
import i18n from '../i18n.js';
import { createState, createSchema } from '../model.js';
import { getElements, renderError } from '../View/view.js';

export default () => {
  const state = createState();
  const elements = getElements();

  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: i18n,
      },
    },
  });

  const watchedState = onChange(state, (path, value) => {
    if (path === 'errors.validateError') {
      renderError(elements.feedback, state.errors.validateError);
    }
  });

  const validateField = () => {
    const schema = createSchema(state.urlFeeds, i18nextInstance);
    return schema
      .validate(state.data)
      .then(() => {
        watchedState.validationState = 'valid';
        return '';
      })
      .catch((err) => {
        watchedState.validationState = 'invalid';
        return err.message;
      });
  };

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    watchedState.data = elements.input.value;
    validateField().then((errMessage) => {
      watchedState.errors.validateError = errMessage;
    });
  });
};
