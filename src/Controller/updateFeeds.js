import axios from 'axios';
import { createLi } from '../View/createContent.js';
import parser from './parser.js';

const checkRssFeed = (state) => {
  const linkUr = 'https://allorigins.hexlet.app/get?url=';
  state.urlFeeds.forEach((url, i) => {
    axios.get(`${linkUr}${encodeURIComponent(`${url}`)}&disableCache=true`)
      .then((response) => response.data.contents)
      .then((data) => {
        const rssXml = parser(data);
        const oldTitlePosts = state.feedsAndPosts.posts.map((post) => post.title);
        const items = rssXml.querySelectorAll('item');
        items.forEach((item) => {
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const ul = document.getElementById('listP');
          if (!oldTitlePosts.includes(title)) {
            createLi(state, ul, i, link, title, false);
          }
        });
      })
      .catch((error) => {
        console.error(`Ошибка при получении RSS ленты: ${error}`);
      });
  });
  setTimeout(() => checkRssFeed(state), 5000);
};
export default checkRssFeed;
