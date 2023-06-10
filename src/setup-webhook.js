const Script = async ({github, context, core}, repoName) => {
  const {WEBHOOK_SELF_HOSTED_RUNNER} = process.env;
  const webhookUrl = 'https://c32386e4-7e51-4ad8-8959-c2a6ba5310ea.mock.pstmn.io';
  
  
  console.log('Get List of all Webhook');
  const webhooksOpts = github.rest.repos.listWebhooks({
        owner: 'rmajidorg',
        repo: repoName
  });
  
  const webhooks = await github.paginate(webhooksOpts)

  
    console.log('Check if the self hosted runner already exist');
  for (const webhook of webhooks) {
    console.log(`Iteration : ${webhook}`);
    if (webhook.url === webhookUrl) {
      console.log('Webhook Already created');
      await github.rest.repos.updateWebhook({
          owner: 'rmajidorg',
          repo: repoName,
          hook_id: webhook.id,
          config: {
            url: webhookUrl,
            content_type: 'json',
            secret: `${WEBHOOK_SELF_HOSTED_RUNNER}`
          },
          events: ["workflow_job"],
          active: true
        });
      return
    }
  }
  
  await github.rest.repos.createWebhook({
          owner: 'rmajidorg',
          repo: repoName,
          config: {
            url: webhookUrl,
            content_type: 'json',
            secret: `${WEBHOOK_SELF_HOSTED_RUNNER}`
          },
          events: ["workflow_job"],
          active: true
        });
}

export default Script
