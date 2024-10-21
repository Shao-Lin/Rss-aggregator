import * as yup from 'yup';
import onChange from 'on-change';

export default () => {
  const state = {
    validationState: 'valid',
    error: '',
    isSubmiting: false,
    data: '',
    urlFeeds: [],
  };
  const elements = {
    button: document.querySelector('[aria-label="add"]'),
    input: document.querySelector('#url-input'),
    form: document.querySelector('.rss-form'),
    feedback: document.querySelector('.feedback'),
  };
  const createSchema = () =>
    yup
      .string()
      .required()
      .url('Ссылка должна быть валидным URL')
      .notOneOf(state.urlFeeds, 'RSS уже существует');

  const renderError = () => {
    elements.feedback.textContent = state.error;
  };

  const watchedState = onChange(state, (path, value) => {
    if (path === 'error') {
      renderError();
    }
  });

  const validateField = () => {
    const schema = createSchema();
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
      watchedState.error = errMessage;
    });
  });
};
