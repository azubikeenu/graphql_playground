const users = [
    { id: '1', name: 'Richard', email: 'enuazubike88@gmail.com', age: 33 },
    { id: '2', name: 'Carlos', email: 'carlos@gmail.com' },
    { id: '3', name: 'Mike', email: 'mike@gmail.com' },
  ];

  const posts = [
    {
      id: '1',
      title: 'Post one',
      text: 'This is the text of post one',
      published: true,
      author: '1',
    },
    {
      id: '2',
      title: 'Post two',
      text: 'This is the text of post two',
      published: false,
      author: '1',
    },
    {
      id: '3',
      title: 'Post three',
      text: 'This is the text of post three',
      published: true,
      author: '2',
    },
  ];

  const comments = [
    { id: '1', text: `you couldn't have said it better`, post: '1', author: '1' },
    { id: '2', text: `hahaha thats really funny bro`, post: '1', author: '3' },
    { id: '3', text: `here we go again`, post: '2', author: '2' },
    { id: '4', text: `Thats all folks`, post: '2', author: '1' },
  ];


  const db = {comments ,users ,posts}

  export { db  as  default}