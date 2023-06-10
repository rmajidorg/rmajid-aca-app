const Script = async ({github, context, core}, repoName) => {
  const {WEBHOOK_SELF_HOSTED_RUNNER} = process.env;
  await github.rest.repos.createWebhook({
        owner: 'rmajid-aca-app',
        repo: repoName,
        config: {
          url: 'https://c32386e4-7e51-4ad8-8959-c2a6ba5310ea.mock.pstmn.io',
          content_type: 'json',
          secret: `${WEBHOOK_SELF_HOSTED_RUNNER}`
        },
        events: ["workflow_job"],
        active: true
      });
}

export default Script
