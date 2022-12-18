const library = {
  countCollections: 5,
  countVolumes: 13,
  countPages: 247,
  countLines: 3422,
  collections: [
    {
      id: '9526d92d-72b3-487e-a622-5d09f1fd6814',
      name: 'Collection 1',
      date: '25/03/2022',
      children: [
        {
          id: '19a942a1-bbde-4f13-bd2e-cf27fa3a06be',
          name: 'Page 1.1'
        },
        {
          id: '413ce941-9095-4aac-8eba-6307ed3dbf74',
          name: 'Collection 1.1',
          children: [
            {
              id: '1ad42f6f-43a9-4b80-a958-33bdc6f2b4db',
              name: 'Page 1.1.1'
            },
            {
              id: 'e1c5bdb5-fb37-42f9-9a4f-ea98ca38746f',
              name: 'Page 1.1.2'
            }
          ]
        }
      ]
    },
    {
      id: '7c15402e-234b-468a-a745-c501a0a4ff79',
      name: 'Collection 2',
      date: '26/03/2022',
      children: [
        {
          id: '57079cd0-f49b-4f98-8040-be82af56d91a',
          name: 'Page 2.1'
        },
        {
          id: 'cc505c25-4ec6-4f1e-85e7-d1706ed3fb8e',
          name: 'Collection 2.1',
          children: [
            {
              id: '86e01c62-f7f5-4a24-afda-fa32f7a0d0c3',
              name: 'Page 2.1.1'
            },
            {
              id: '572a354b-e978-4377-8f11-585090a26a26',
              name: 'Page 2.1.2'
            }
          ]
        }
      ]
    }
  ]
};

module.exports = {
  library
};