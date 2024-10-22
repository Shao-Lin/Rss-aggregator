export const getElements = () => ({
  button: document.querySelector('[aria-label="add"]'),
  input: document.querySelector('#url-input'),
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback'),
});

export const renderError = (feedbackElement, errorMessage) => {
  const feedback = feedbackElement;
  feedback.textContent = errorMessage;
};
