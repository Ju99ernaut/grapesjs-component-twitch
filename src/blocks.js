import {
  cmpId
} from './consts';

export default (editor, opts = {}) => {
  const bm = editor.BlockManager;
  const {
    block,
    label,
    category
  } = opts;

  block && bm.add(cmpId, {
    label: label,
    category: category,
    attributes: {
      class: 'fa fa-twitch'
    },
    activate: true,
    select: true,
    content: {
      type: cmpId,
      content: 'Link to channel, single video ,or video and collection from twitch in settings panel',
      style: {
        padding: '10px'
      }
    },
    ...block,
  });
}