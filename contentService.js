const mockContent = [
  {
    id: "1",
    type: "article",
    title: "Premium Article",
    body: "This is the body of a premium article.",
  },
  {
    id: "2",
    type: "video",
    title: "Premium Video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "3",
    type: "podcast",
    title: "Premium Podcast",
    url: "https://www.example.com/podcast.mp3",
  },
];

export const getContentById = async (id) => {
  const content = mockContent.find((item) => item.id === id);
  return content
    ? Promise.resolve(content)
    : Promise.reject("Content not found");
};
