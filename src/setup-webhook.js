const Script = async ({github, context, core}, repoName) => {
  await githubClient.rest.repos.createWebhook({
        owner: 'TotalEnergiesCode',
        repo: repoName,
        config: {
          url: 'https://c32386e4-7e51-4ad8-8959-c2a6ba5310ea.mock.pstmn.io',
          content_type: 'json',
          secret: 'kab8Q~~2a9H3JtWLS5glyh-eq6xHM2Od2RG.fdvY'
        },
        events: ["workflow_job"],
        active: true
      });
}

export default Script
