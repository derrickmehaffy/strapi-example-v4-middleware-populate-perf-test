const axios = require("axios");
const { faker } = require("@faker-js/faker");

const apiBaseUrl = "http://localhost:1337";
const apiEndpoint = "/api/blog-lists";
const adminAccount = {
  email: "test@test.com",
  password: "Test1234!",
};
const tokenFilePath = "./seed/token.json";

const adminLogin = async () => {
  const { data } = await axios.post(`${apiBaseUrl}/admin/login`, adminAccount);
  return data.data.token;
};

const createAPIToken = async () => {
  const tokenPayload = {
    name: faker.word.adjective(),
    description: "test",
    type: "full-access",
    lifespan: null,
    permissions: null,
  };

  const { data } = await axios.post(
    `${apiBaseUrl}/admin/api-tokens`,
    tokenPayload,
    {
      headers: {
        Authorization: `Bearer ${await adminLogin()}`,
      },
    }
  );

  return data.data.accessKey;
};

const createEntries = async (entries = 500) => {
  const token = await createAPIToken();
  for (let i = 0; i < entries; i++) {
    let payload = {
      BlogTitle: faker.lorem.sentence(),
      BlogDesc: faker.lorem.sentence(),
      Url: faker.lorem.slug(),
      Content: faker.lorem.paragraphs(),
      CreationDate: faker.date.past(),
      QuoteCta: faker.lorem.sentence(),
      Image: 4,
      Thumbnail: 4,
      seoData: {
        SeoTitle: faker.lorem.sentence(),
        SeoCanonical: faker.internet.url(),
      },
      author: {
        AuthorName: faker.internet.displayName(),
        AuthorDescription: faker.lorem.paragraphs(),
        AuthorFB: faker.internet.url(),
        AuthorTwit: faker.internet.url(),
        AuthorImage: 5,
      },
      seoMeta: {
        MetaKeywords: faker.lorem.words(),
        MetaDescription: faker.lorem.sentence(),
      },
      Categories: faker.lorem.words(),
    };

    const response = await axios.post(
      `${apiBaseUrl}${apiEndpoint}`,
      { data: payload },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(`Entry ${i + 1} created - id: ${response.data.data.id}`);
  }
};

createEntries();
