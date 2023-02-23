const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const conversation = document.getElementById('conversation');

form.addEventListener('submit', event => {
  event.preventDefault();
  const message = input.value.trim();
  if (message === '') {
    return;
  }
  addMessage(message, 'user');
  input.value = '';
  getResponse(message);
});

function addMessage(message, sender) {
  const bubble = document.createElement('div');
  const text = document.createElement('p');
  const time = document.createElement('p');
  bubble.appendChild(text);
  bubble.appendChild(time);
  bubble.classList.add('message-bubble');
  text.textContent = message;
  time.textContent = new Date().toLocaleTimeString();
  time.classList.add('message-time');
  if (sender === 'user') {
    bubble.classList.add('user-bubble');
    conversation.appendChild(bubble);
  } else if (sender === 'fabi') {
    bubble.classList.add('fabi-bubble');
    conversation.appendChild(bubble);
  }
  conversation.scrollTop = conversation.scrollHeight;
}

function getResponse(message) {
  const url = 'https://api.quotable.io/random';
  addMessage('Thinking...', 'fabi');
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const quote = data.content;
      addMessage(quote, 'fabi');
    })
    .catch(() => {
      addMessage('Sorry, something went wrong.', 'fabi');
    });
}
