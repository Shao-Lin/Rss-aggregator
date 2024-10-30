const viewModal = (state, btn) => {
  const title = document.querySelector('.modal-title');
  const descriptionText = document.querySelector('.text-break');
  descriptionText.textContent = `${state.feedsAndPosts.posts[btn.getAttribute('data-btn-id')].description}`;
  title.textContent = `${state.feedsAndPosts.posts[btn.getAttribute('data-btn-id')].title}`;
};
const viewedContent = (state, btn) => {
  const a = btn.previousElementSibling;
  a.classList.remove('fw-bold');
  a.classList.add('fw-normal');
  state.uiState.posts.visited.add(`${a.getAttribute('data-a-id')}`);
};
export { viewModal, viewedContent };
