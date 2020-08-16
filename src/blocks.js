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
      content: `<svg viewBox="0 0 24 24" width="70" height="70" style="display:block;margin:auto;"><path fill="#9146FF63" d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>
      <div style="text-align:center;color:#9146FF63">Link to channel, single video ,or video and collection from twitch in settings panel</div>`,
      style: {
        padding: '10px'
      }
    },
    ...block,
  });
}