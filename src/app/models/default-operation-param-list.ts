export interface DefaultOperationParamList {
  id: string;
  configurationKeys?: string[];
}

export const defaultOperationParamList: DefaultOperationParamList[] = [
  {
    id: 'partial-import',
    configurationKeys: [
      'source-presenter-flavor',
      'source-presentation-flavor',
      'source-smil-flavor*',
      'target-presenter-flavor*',
      'target-presentation-flavor*',
      'concat-encoding-profile*',
      'concat-output-framerate',
      'trim-encoding-profile*',
      'force-encoding',
      'force-encoding-profile*',
      'required-extensions',
      'enforce-divisible-by-two']
  }, {
    id: 'defaults',
    configurationKeys: ['key']
  }, {
    id: 'multiencode',
    configurationKeys: [
      'source-flavors',
      'target-flavors',
      'target-tags',
      'encoding-profiles',
      'tag-with-profile']
  }, {
    id: 'publish-oaipmh',
    configurationKeys: [
      'download-flavors',
      'download-tags',
      'streaming-flavors',
      'streaming-tags',
      'check-availability',
      'repository',
      'external-template',
      'external-channel',
      'external-mime-type']
  }, {
    id: 'ingest-download',
    configurationKeys: [
      'delete-external',
      'source-flavors',
      'source-tags',
      'tags-and-flavors']
  }, {
    id: 'publish-aws',
    configurationKeys: [
      'check-availability',
      'download-source-flavors',
      'download-source-tags',
      'download-target-subflavors',
      'download-target-tags',
      'strategy',
      'streaming-source-flavors',
      'streaming-source-tags',
      'streaming-tagret-tags',
      'streaming-target-subflavors']
  }, {
    id: 'post-mediapackage',
    configurationKeys: [
      'url',
      'format',
      'debug',
      'mediapackage.type',
      'auth.enabled',
      'auth.username',
      'auth.password',
      '+source_system']
  }, {
    id: 'editor',
    configurationKeys: [
      'source-flavors',
      'smil-flavors',
      'skipped-flavors',
      'target-flavor-subtype',
      'target-smil-flavor',
      'skip-if-not-trimmed',
      'skip-processing',
      'preview_flavors',
      'interactive']
  }, {
    id: 'export-wf-properties',
    configurationKeys: [
      'target-flavor*',
      'target-tags',
      'keys']
  }, {
    id: 'start-workflow',
    configurationKeys: [
      'media-package*',
      'workflow-definition*',
      'configProperty']
  }, {
    id: 'process-smil',
    configurationKeys: [
      'smil-flavor',
      'source-flavors',
      'target-flavors',
      'target-tags',
      'encoding-profiles',
      'tag-with-profile']
  }, {
    id: 'retract-engage'
  }, {
    id: 'analyze-tracks',
    configurationKeys: [
      'source-flavor*',
      'aspect-ratio',
      'fail-no-tracks']
  }, {
    id: 'encode',
    configurationKeys: [
      'source-flavor',
      'target-flavor',
      'source-tags',
      'target-tags',
      'encoding-profile']
  }, {
    id: 'clone',
    configurationKeys: [
      'source-flavor',
      'source-tags',
      'target-flavor*']
  }, {
    id: 'google-speech-attach-transcription',
    configurationKeys: [
      'transcription-job-id',
      'line-size',
      'target-flavor',
      'target-tag',
      'target-caption-format']
  }, {
    id: 'inspect',
    configurationKeys: [
      'accept-no-media',
      'accurate-frame-count',
      'overwrite']
  }, {
    id: 'demux',
    configurationKeys: [
      'source-flavors',
      'target-tags',
      'target-flavors',
      'encoding-profile']
  }, {
    id: 'series',
    configurationKeys: [
      'series',
      'attach',
      'apply-acl',
      'copy-metadata',
      'default-namespace']
  }, {
    id: 'cleanup',
    configurationKeys: [
      'preserve-flavors',
      'delete-external',
      'delay']
  }, {
    id: 'composite',
    configurationKeys: [
      'source-audio-name',
      'source-tags-upper',
      'source-flavor-upper',
      'source-tags-lower',
      'source-flavor-lower',
      'source-tags-watermark',
      'source-flavor-watermark',
      'source-url-watermark',
      'target-tags',
      '* target-flavor',
      '* encoding-profile',
      '* output-resolution',
      'output-background',
      'layout',
      'layout-single',
      'layout-dual',
      'layout-{name}']
  }, {
    id: 'duplicate-event',
    configurationKeys: [
      'source-flavors',
      'source-tags',
      'target-tags',
      'property-namespaces',
      'copy-number-prefix',
      'number-of-events',
      'max-number-of-events']
  }, {
    id: 'error-resolution'
  }, {
    id: 'execute-once',
    configurationKeys: [
      'exec',
      'params',
      'load',
      'set-workflow-properties',
      'output-filename',
      'expected-type',
      'target-flavor',
      'target-tags']
  }, {
    id: 'configure-by-dcterm',
    configurationKeys: [
      'dccatalog',
      'dcterm',
      'match-value',
      'default-value',
      'configProperty']
  }, {
    id: 'image-to-video',
    configurationKeys: [
      'source-tags*',
      'source-flavor*',
      'target-tags',
      'target-flavor',
      'duration*',
      'profile*']
  }, {
    id: 'theme',
    configurationKeys: [
      '*bumper-flavor',
      '*bumper-tags',
      '*trailer-flavor',
      '*trailer-tags',
      '*title-slide-flavor',
      '*title-slide-tags',
      '*watermark-flavor',
      '*watermark-tags',
      '*watermark-layout-variable']
  }, {
    id: 'extract-text',
    configurationKeys: [
      'source-flavor',
      'source-tags',
      'target-tags']
  }, {
    id: 'attach-watson-transcription',
    configurationKeys: [
      'transcription-job-id',
      'target-flavor',
      'target-tag',
      'target-caption-format']
  }, {
    id: 'transfer-metadata',
    configurationKeys: [
      'source-flavor',
      'target-flavor',
      'source-element',
      'target-element',
      'force',
      'concat',
      'target-prefix']
  }, {
    id: 'analyze-audio',
    configurationKeys: [
      'source-flavors',
      'source-flavor',
      'source-tags',
      'force-transcode']
  }, {
    id: 'publish-youtube',
    configurationKeys: [
      'source-flavors',
      'source-tags']
  }, {
    id: 'crop-video',
    configurationKeys: [
      'source-flavor',
      'target-tags',
      'target-flavor']
  }, {
    id: 'send-email',
    configurationKeys: [
      'body',
      'body-template-file',
      'subject',
      'to',
      'cc',
      'bcc',
      'use-html']
  }, {
    id: 'silence',
    configurationKeys: [
      'source-flavors',
      'reference-tracks-flavor',
      'smil-flavor-subtype']
  }, {
    id: 'normalize-audio',
    configurationKeys: [
      'source-flavors',
      'source-flavor',
      'source-tags',
      'target-flavor',
      'target-tags',
      'target-decibel*',
      'force-transcode']
  }, {
    id: 'incident',
    configurationKeys: [
      'code',
      'severity',
      'details',
      'params']
  }, {
    id: 'move-storage',
    configurationKeys: [
      'target-storage*',
      'target-version']
  }, {
    id: 'retract-configure'
  }, {
    id: 'snapshot',
    configurationKeys: [
      'source-tags',
      'source-flavors']
  }, {
    id: 'republish-oaipmh',
    configurationKeys: [
      'source-flavors',
      'source-tags',
      'repository']
  }, {
    id: 'image-convert',
    configurationKeys: [
      'source-tags*',
      'source-flavors*',
      'tags-and-flavors',
      'target-tags',
      'target-flavor*',
      'encoding-profiles*']
  }, {
    id: 'add-catalog',
    configurationKeys: [
      'catalog-path',
      'catalog-flavor',
      'catalog-name',
      'catalog-tags',
      'catalog-type-collision-behavior']
  }, {
    id: 'tag',
    configurationKeys: [
      'source-tags',
      'source-flavors',
      'target-tags',
      'target-flavor',
      'copy']
  }, {
    id: 'copy',
    configurationKeys: [
      'source-flavors',
      'source-tags',
      'target-directory*',
      'target-filename']
  }, {
    id: 'animate',
    configurationKeys: [
      'animation-files',
      'target-flavor',
      'width',
      'height',
      'fps',
      'cmd-args',
      'target-tags']
  }, {
    id: 'probe-resolution',
    configurationKeys: [
      'source-flavor*',
      'var:VARNAME',
      'val:VARNAME']
  }, {
    id: 'compose',
    configurationKeys: [
      'source-flavor',
      'source-tag',
      'skip-if-flavor-exists']
  }, {
    id: 'compose',
    configurationKeys: [
      'source-flavor',
      'source-tag',
      'skip-if-flavor-exists',
      'language-code']
  }, {
    id: 'failing'
  }, {
    id: 'waveform',
    configurationKeys: [
      'source-flavors',
      'source-tags',
      'target-flavor',
      'target-tags',
      'pixels-per-minute',
      'min-width',
      'max-width',
      'height',
      'color']
  }, {
    id: 'select-tracks',
    configurationKeys: [
      'source-flavor*',
      'target-flavor*',
      'target-tags',
      'audio-muxing',
      'force-target']
  }, {
    id: 'execute-many',
    configurationKeys: [
      'exec',
      'params',
      'load',
      'set-workflow-properties',
      'source-flavor',
      'source-tag',
      'source-audio',
      'source-video',
      'output-filename',
      'expected-type',
      'target-flavor',
      'target-tags']
  }, {
    id: 'tag-by-dcterm',
    configurationKeys: [
      'source-tags',
      'source-flavors',
      'dccatalog',
      'dcterm',
      'match-value',
      'default-value\'',
      'target-tags',
      'target-flavor',
      'copy']
  }, {
    id: 'import-wf-properties',
    configurationKeys: [
      'source-flavor*',
      'keys']
  }, {
    id: 'zip',
    configurationKeys: [
      'zip-collection',
      'include-flavors',
      'target-flavor',
      'target-tags',
      'compression']
  }, {
    id: 'comment',
    configurationKeys: [
      'action',
      'reason',
      'description']
  }, {
    id: 'publish-engage',
    configurationKeys: [
      'check-availability',
      'download-source-flavors',
      'download-source-tags',
      'download-target-subflavors',
      'download-target-tags',
      'strategy',
      'streaming-source-flavors',
      'streaming-source-tags',
      'streaming-target-tags',
      'streaming-target-subflavors',
      'merge-force-flavors']
  }, {
    id: 'segmentpreviews',
    configurationKeys: [
      'source-flavor',
      'target-flavor',
      'source-tags',
      'target-tags',
      'encoding-profile',
      'reference-flavor',
      'reference-tags']
  }, {
    id: 'retract-oaipmh',
    configurationKeys: ['repository']
  }, {
    id: 'image',
    configurationKeys: [
      'source-flavor',
      'source-flavors',
      'source-tags',
      'target-flavor',
      'target-tags',
      'encoding-profile',
      'time',
      'target-base-name-format-second',
      'target-base-name-format-percent',
      'end-margin']
  }, {
    id: 'asset-delete',
    configurationKeys: ['keep-last-snapshot']
  }, {
    id: 'mattermost-notify',
    configurationKeys: [
      'url',
      'message',
      'method',
      'max-retry',
      'timeout']
  }, {
    id: 'segment-video',
    configurationKeys: ['source-flavor']
  }, {
    id: 'retract-youtube'
  }, {
    id: 'retract-aws'
  }, {
    id: 'include',
    configurationKeys: ['workflow-id']
  }, {
    id: 'compose',
    configurationKeys: [
      'source-flavor',
      'target-flavor',
      'source-tags',
      'target-tags',
      'encoding-profile',
      'encoding-profiles',
      'tags-and-flavors']
  }, {
    id: 'timelinepreviews',
    configurationKeys: [
      'source-flavors',
      'target-flavor',
      'target-tags',
      'image-count',
      'process-first-match-only']
  }, {
    id: 'statistics-writer',
    configurationKeys: [
      'flavor',
      'measurement-name',
      'organization-resource-id-name',
      'length-field-name',
      'temporal-resolution',
      'retention-policy',
      'retract']
  }, {
    id: 'prepare-av',
    configurationKeys: [
      'source-flavor',
      'target-flavor',
      'mux-encoding-profile',
      'audio-video-encoding-profile',
      'video-encoding-profile',
      'audio-encoding-profile',
      'rewrite',
      'audio-muxing-source-flavors']
  }];
