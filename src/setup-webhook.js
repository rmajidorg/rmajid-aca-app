const Script = async ({github, context, core}, repoName) => {
  const {WEBHOOK_SELF_HOSTED_RUNNER} = process.env;
  const webhookUrl = 'https://c32386e4-7e51-4ad8-8959-c2a6ba5310ea.mock.pstmn.io';
  const webhookConf = {
      owner: 'rmajidorg',
      repo: repoName,
      config: {
        url: webhookUrl,
        content_type: 'json',
        secret: `${WEBHOOK_SELF_HOSTED_RUNNER}`
      },
      events: ["workflow_job"],
      active: true
    };
  
  const webhooksOpts = github.rest.repos.listWebhooks({
        owner: 'rmajidorg',
        repo: repoName
  });
  
  const webhooks = await github.paginate(webhooksOpts)

  for (const webhook of webhooks) {
    console.log(webhook);
    if (webhook.url === webhookUrl) {
      console.log('Webhook Already created');
      await github.rest.repos.updateWebhook({
        ...webhookConf
        hook_id: webhook.hook_id
      });
      return
    }
  }
  
  await github.rest.repos.createWebhook(webhookConf);
}

export default Script
