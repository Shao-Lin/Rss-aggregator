export const createFeedForFirstTry = () => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');
  
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  
    const labelFeeds = document.createElement('h2');
    labelFeeds.classList.add('card-title', 'h4');
    labelFeeds.textContent = 'Фиды';
  
    cardBody.appendChild(labelFeeds);
    card.appendChild(cardBody);
    const feeds = document.querySelector('.feeds');
    feeds.appendChild(card);
  
    const listFeeds = document.createElement('ul');
    listFeeds.classList.add('list-group', 'border-0', 'rounded-0');
    listFeeds.setAttribute('id', 'listF');
    card.appendChild(listFeeds);
  };

export const createPostForFirstTry = () => {
    const postCard = document.createElement('div');
    postCard.classList.add('card', 'border-0');
  
    const cardBodyPost = document.createElement('div');
    cardBodyPost.classList.add('card-body');
  
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    ul.setAttribute('id', 'listP');
  
    const h2 = document.createElement('h2');
    h2.classList.add('card-title', 'h4');
    h2.textContent = 'Посты';
  
    cardBodyPost.appendChild(h2);
    postCard.appendChild(cardBodyPost);
    postCard.appendChild(ul);
    const posts = document.querySelector('.posts');
    posts.appendChild(postCard);
  };
