import * as yup from 'yup';

export const state = {
  validationState: 'valid',
  error: '',
  successMessage: '',
  isSubmiting: false,
  data: '',
  urlFeeds: [],
  feedsAndPosts: {
    feeds: [],
    posts: [],
  },
  uiState: {
    posts: {
      visited: new Set(),
    },
  },
};

export const createSchema = (urlFeeds, i18nextInstance) => yup.string().required().url(i18nextInstance.t('texts.TheLinkMustBeAValidUrl')).notOneOf(urlFeeds, i18nextInstance.t('texts.RssAlreadyExists'));
