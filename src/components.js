import {
  cmpId
} from './consts';

export default (editor, opts = {}) => {
  const domc = editor.DomComponents;
  const {
    keys
  } = Object;

  const idTrait = {
    name: 'id',
    label: 'Id'
  }

  const titleTrait = {
    name: 'title',
    label: 'Title'
  }

  // Some options as on
  // https://dev.twitch.tv/docs/embed/everything
  const typedProps = {
    channel: '',
    width: 1100,
    height: 480,
    'allow-full-screen': true,
    layout: [{
        id: 'video-with-chat',
        name: 'video-with-chat'
      },
      {
        id: 'video',
        name: 'video'
      }
    ],
    theme: [{
        id: 'light',
        name: 'light'
      },
      {
        id: 'dark',
        name: 'dark'
      }
    ],
    video: '',
    collection: '',
  };

  const getTraitType = value => {
    if (typeof value == 'number') return 'number';
    if (typeof value == 'boolean') return 'checkbox';
    if (typeof value == 'object') return 'select';
    return 'text';
  };

  const traits = keys(typedProps)
    .map(name => ({
      changeProp: 1,
      type: getTraitType(typedProps[name]),
      options: typedProps[name],
      min: 0,
      placeholder: 'eg. Some ID',
      name,
    }));

  typedProps.layout = 'video-with-chat';
  typedProps.theme = 'light';

  domc.addType(cmpId, {
    model: {
      defaults: opts.props({
        ...typedProps,
        twitchsrc: opts.script,
        droppable: 0,
        traits: [
          idTrait,
          titleTrait,
          ...traits
        ],
        script() {
          const collection = '{[ collection ]}';
          const channel = '{[ channel ]}';
          const video = '{[ video ]}';
          const int = num => parseInt(num, 10) || 0;
          const bool = val => !!val;
          const init = () => {
            const el = this;
            const config = {
              allowfullscreen: bool('{[ allow-full-screen ]}'),
              height: int('{[ height ]}'),
              layout: '{[ layout ]}',
              theme: '{[ theme ]}',
              width: int('{[ width ]}'),
            };

            if (channel && channel.length) {
              config.channel = channel;
            } else if (video && video.length) {
              if (collection && collection.length) {
                config.collection = {
                  video,
                  collection
                };
              } else {
                config.video = video;
              }
            }

            (channel.length || video.length) && (el.innerText = '');
            new Twitch.Embed(el.id, config);
          };

          if (!window.Twitch) {
            const scr = document.createElement('script');
            scr.src = '{[ twitchsrc ]}';
            scr.onload = init;
            document.body.appendChild(scr);
          } else {
            init();
          }
        },
      }),

      init() {
        const events = traits.map(i => `change:${i.name}`).join(' ');
        this.on(events, () => {
          this.trigger('change:script')
        });
      },
      toHTML() {
        const tagName = this.get('tagName');
        return `<${tagName} id="${this.getId()}"><svg viewBox="0 0 24 24" width="70" height="70" style="display:block;margin:auto;"><path fill="#9146FF63" d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg></${tagName}>`;
      },
    },
  });
};