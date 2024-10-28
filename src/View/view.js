import { createFeedForFirstTry, createPostForFirstTry } from './createFirstMark.js';
import { createFeed, createPost } from './createContent.js';

const elements = {
  button: document.querySelector('[aria-label="add"]'),
  input: document.querySelector('#url-input'),
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback'),
};

const renderError = (errorMessage, success) => {
  if (success) {
    elements.feedback.classList.remove('text-danger');
    elements.feedback.classList.add('text-success');
  } else {
    elements.feedback.classList.remove('text-success');
    elements.feedback.classList.add('text-danger');
  }
  elements.feedback.textContent = errorMessage;
};

const afterSuccessAdd = (s) => {
  const state = s;
  state.data = '';
  elements.input.value = '';
};

const createFirst = () => {
  createFeedForFirstTry();
  createPostForFirstTry();
};
const createContent = (rssXml, state) => {
  createFeed(rssXml, state);
  createPost(rssXml, state);
};

export { elements, renderError, createFirst, createContent, afterSuccessAdd }
