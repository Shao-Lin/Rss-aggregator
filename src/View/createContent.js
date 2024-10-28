export const createFeed = (rssXml, state) => {
    const titleContent = rssXml.querySelector('title').textContent;
    const descriptionContent = rssXml.querySelector('description').textContent;
  
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    li.setAttribute('feedId', `${state.feedsAndPosts.feeds.length + 1}`);
    state.feedsAndPosts.feeds.push({ feedId: li.getAttribute('feedId'), title: titleContent });
    const ul = document.getElementById('listF');
    ul.appendChild(li);
    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    title.textContent = titleContent;
    li.appendChild(title);
  
    const description = document.createElement('description');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = descriptionContent;
    li.appendChild(description);
  };

  export const createPost = (rssXml, state) => {
    const nodeItems = rssXml.querySelectorAll('item');
    const ul = document.getElementById('listP');
    nodeItems.forEach((item, i) => {
      const title = item.querySelector('title').textContent;
      const link = item.querySelector('link').textContent;
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      li.setAttribute('postId', `${state.feedsAndPosts.posts.length + 1}`);
      state.feedsAndPosts.posts.push({ postId: li.getAttribute('postId'), feedId: state.feedsAndPosts.feeds.at(-1).feedId, title });
  
      const a = document.createElement('a');
      a.setAttribute('href', `${link}`);
      a.classList.add('fw-bold');
      a.setAttribute('data-id', `${i}`);
      a.setAttribute('target', 'blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = title;
      
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('data-id', `${i}`);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = 'Просмотр';
  
      li.appendChild(a);
      li.appendChild(button);
      ul.appendChild(li);
    });
  };