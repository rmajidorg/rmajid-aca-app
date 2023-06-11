const Script = async ({github, context, core}, repoName) => {
  const {WEBHOOK_SELF_HOSTED_RUNNER, WEBHOOK_HANDLE_JOB_QUEUED_AUTH_FUNC, WEBHOOK_HANDLE_JOB_QUEUED_URL } = process.env;
  const webhookUrl = `${WEBHOOK_HANDLE_JOB_QUEUED_URL}?code=${WEBHOOK_HANDLE_JOB_QUEUED_AUTH_FUNC}`;
  
  
  console.log('Get List of all Webhook');
  const webhooksOpts = github.rest.repos.listWebhooks.endpoint.merge({
        owner: 'rmajidorg',
        repo: repoName
  });
  
  const webhooks = await github.paginate(webhooksOpts)

  
  console.log('Check if the self hosted runner webhook already exist');
  for (const webhook of webhooks) {
    if (webhook.config.url === webhookUrl) {
      console.log('Webhook exist, updating configuration');
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
      console.log('Webhook updated');
      return
    }
  }
  
  console.log('Webhook not found, creating with configuration');
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
  
  console.log('Webhook created');
}

export default Script
