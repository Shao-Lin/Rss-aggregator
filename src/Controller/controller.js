import onChange from 'on-change';
import axios from 'axios';
import i18next from 'i18next';
import i18n from '../i18n.js';
import { state, createSchema } from '../model.js';
import { elements, renderError, createFirst, createContent, afterSuccessAdd } from '../View/view.js';
import parser from './parser.js';

export default () => {
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
    if (path === 'successMessage') {
      renderError(state.successMessage, true);
      state.successMessage = '';
    }
    if (path === 'error') {
      renderError(state.error, false);
    }
    if (path === 'isSubmiting' && value === true) {
      elements.input.disabled = true;
      elements.button.disabled = true;
    }
    if (path === 'isSubmiting' && value === false) {
      elements.input.disabled = false;
      elements.button.disabled = false;
    }
  });

  const validateField = () => {
    const schema = createSchema(state.urlFeeds, i18nextInstance);
    return schema
      .validate(state.data)
      .then(() => {
        watchedState.validationState = 'valid';
      })
      .catch((err) => {
        watchedState.validationState = 'invalid';
        watchedState.error = err.message;
        throw new Error('Validation failed');
      });
  };

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    watchedState.isSubmiting = true;
    watchedState.data = elements.input.value;
    validateField()
      .then(() => {
        const link = 'https://allorigins.hexlet.app/get?url=';
        return axios.get(`${link}${encodeURIComponent(`${state.data}`)}&disableCache=true`);
      })
      .then((response) => {
        if (response.data.status.http_code !== 200) {
          throw new Error('HttpError');
        }
        return response.data.contents;
      })
      .then((data) => {
        // console.log(data);
        const rssXml = parser(data);
        if (state.urlFeeds.length === 0) {
          createFirst();
        }
        createContent(rssXml, state);
        state.urlFeeds.push(state.data);
        afterSuccessAdd(state);
        watchedState.successMessage = i18nextInstance.t('texts.RssUploadedSuccessfully');
        console.log(state);
      })
      .catch((err) => {
        if (err.message === 'Validation failed') {
          console.log(`aaaaaaaa ${state.error}`);
          console.log('Ошибка валидации:', watchedState.error);
        } else if (err.message === 'HttpError') {
          console.log(`aaaaaaaa ${state.error}`);
          watchedState.error = i18nextInstance.t('texts.Response');
          console.log('Ошибка HTTP:', state.error);
        } else if (axios.isAxiosError(err)) {
          watchedState.error = i18nextInstance.t('texts.Request');
          console.log('Ошибка HTTP:', state.error);
        } else {
          console.error('Неизвестная ошибка:', err);
        }
      })
      .finally(() => {
        watchedState.isSubmiting = false;
        elements.input.focus();
      });
  });
};
