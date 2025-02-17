import onChange from 'on-change';
import axios from 'axios';
import i18next from 'i18next';
import i18n from '../i18n.js';
import checkRssFeed from './updateFeeds.js';
import { state, createSchema } from '../model.js';
import {
  elements, renderError, createFirst, createContent, afterSuccessAdd,
} from '../View/view.js';
import proxy from '../proxy.js';
import { viewModal, viewedContent } from '../View/viewingTheNews.js';
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
  const clickBtnReadCompletely = (btn) => {
    const aPost = btn.previousElementSibling;
    const link = aPost.getAttribute('href');
    const modal = document.querySelector('[id="modal"]');
    const a = modal.querySelector('a');
    a.setAttribute('href', `${link}`);
  };
  const clickBtn = () => {
    const viewButtons = document.querySelectorAll('[data-btn-id]');
    viewButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        viewModal(state, btn);
        viewedContent(state, btn);
        clickBtnReadCompletely(btn);
      });
    });
  };

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
  checkRssFeed(state);
  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    watchedState.isSubmiting = true;
    watchedState.data = elements.input.value;
    validateField()
      .then(() => axios.get(proxy(state.data)))
      .then((response) => {
        const data = response.data.contents;
        const rssXml = parser(data);

        const rssElement = rssXml.querySelector('rss');
        const channelElement = rssXml.querySelector('channel');
        const itemElement = rssXml.querySelector('item');
        if (!(rssElement && channelElement && itemElement)) {
          throw new Error('HttpError');
        }
        return rssXml;
      })
      .then((rssXml) => {
        if (state.urlFeeds.length === 0) {
          createFirst();
        }
        createContent(rssXml, state);
        state.urlFeeds.push(state.data);
        afterSuccessAdd(state);
        watchedState.successMessage = i18nextInstance.t('texts.RssUploadedSuccessfully');
        clickBtn();
      })
      .catch((err) => {
        if (err.message === 'Validation failed') {
          console.log('Ошибка валидации:', watchedState.error);
        } else if (err.message === 'HttpError') {
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
