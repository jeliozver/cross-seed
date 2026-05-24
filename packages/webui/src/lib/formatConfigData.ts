import {
  RuntimeConfig,
  WebhookEntry,
  WebhookObjectSchema,
} from '../../../shared/configSchema';

let webhookIdCounter = 0;

/**
 * Generates a stable, unique id for a webhook form row. Used as the React key
 * and as the key for per-row UI state so it survives add/remove reordering.
 * A counter is used rather than `crypto.randomUUID()` because the WebUI may be
 * served from a non-secure context (LAN IP over HTTP) where it is unavailable.
 */
export function nextWebhookId(): string {
  webhookIdCounter += 1;
  return `webhook-${webhookIdCounter}`;
}

/**
 * Transforms API config data for the WebUI form. Webhook entries are normalized
 * to the form's `{ id, url, payload, headers }` shape, with payload/headers
 * serialized back to JSON text for editing in the textareas.
 */
export function formatConfigDataForForm(config: RuntimeConfig) {
  return {
    ...config,
    ...(config.notificationWebhookUrls && {
      notificationWebhookUrls: config.notificationWebhookUrls.map(
        (e: WebhookEntry) => {
          if (typeof e === 'string') {
            return { id: nextWebhookId(), url: e, payload: '', headers: '' };
          }
          const parsed = WebhookObjectSchema.safeParse(e);
          if (parsed.success) {
            return {
              id: nextWebhookId(),
              url: parsed.data.url,
              payload: parsed.data.payload
                ? JSON.stringify(parsed.data.payload)
                : '',
              headers: parsed.data.headers
                ? JSON.stringify(parsed.data.headers)
                : '',
            };
          }
          return {
            id: nextWebhookId(),
            url: '',
            payload: '',
            headers: '',
          };
        },
      ),
    }),
  };
}
