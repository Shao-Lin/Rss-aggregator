import * as yup from 'yup';

export const createState = () => ({
  validationState: 'valid',
  errors: {
    validateError: '',
  },
  isSubmiting: false,
  data: '',
  urlFeeds: [],
});

export const createSchema = (urlFeeds, i18nextInstance) =>
  yup
    .string()
    .required()
    .url(i18nextInstance.t('texts.TheLinkMustBeAValidUrl'))
    .notOneOf(urlFeeds, i18nextInstance.t('texts.RssAlreadyExists'));
