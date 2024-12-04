export const usePosts = () => {
  const posts = [
    {
      id: "1",
      author: {
        name: "Aina Kaiser",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
        username: "Aina",
      },
      content:
        "Comming to Berlin Germany vom 22.11. evening till 26.11. morning looking for SBK (or Salsa or Bachata or Kizomba) socials near Caroline-Michaelis-Straße 8, Mitte, 10115 Berlin",
      type: "request",
      createdAt: "2024-03-19T00:00:00.000Z",
      upvotes: 0,
      commentsCount: 1,
    },
    {
      id: "2",
      author: {
        name: "Aina Kaiser",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
        username: "Aina",
      },
      url: "https://www.youtube.com/watch?v=R7E9cNydevg",
      type: "video",
      createdAt: "2024-03-19T00:00:00.000Z",
      upvotes: 0,
      commentsCount: 1,
    },
    {
      id: "3",
      author: {
        name: "Aina Kaiser",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2Fv0dfuvXmPJW4TN4wPS2KEo849WT2%2F5eb0f724-2a86-491c-98a6-f614e0a6c8bf?alt=media&token=2fc50226-d15c-4a27-a340-0cee1e4bd868",
        username: "Aina",
      },
      event: {
        image:
          "https://res.cloudinary.com/djumxevsm/image/upload/v1728417958/ewwrfgoz26mjmb1s0rfb.jpg",
        type: "Festival",
        styles: ["Bachata", "Salsa"],
        name: "SALSA CUBAINE - STRASBOURG",
        date: "Thu, 21 Nov 2024, 18:30 — 20:00",
        location: "Strasbourg, France",
      },
      type: "event",
      createdAt: "2024-03-19T00:00:00.000Z",
      upvotes: 0,
      commentsCount: 1,
    },
    {
      id: "4",
      author: {
        name: "Alex Razbakov",
        photo:
          "https://firebasestorage.googleapis.com/v0/b/wedance-4abe3.appspot.com/o/media%2FtvR012ArEpQhCJdPHh6G7sLuqoO2%2F85cc5d77-6212-4707-85e0-24bdf72b1c7c?alt=media&token=2872dc07-fa22-46b7-8f0e-41c935fc6345",
        username: "alexrazbakov",
      },
      title: "Changó: Aluya vs A La Metá Steps",
      image: "https://wedance.vip/img/chango.jpg",
      content:
        "It was a unique opportunity for a conversation, one that would delve into the intricacies of Afro-Cuban dance, as Alex Razbakov sat down with Dayron Josue Rivera to explore the stories and significance behind the Aluya and A La Metá steps.",
      type: "article",
      createdAt: "2024-03-19T00:00:00.000Z",
      upvotes: 0,
      commentsCount: 1,
    },
  ];
  return {
    posts,
  };
};
