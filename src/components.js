import {
  cmpId
} from './consts';

export default (editor, opts = {}) => {
  const domc = editor.DomComponents;
  const defaultView = domc.getType('default').view;
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
      }
    },
    view: defaultView.extend({
      init() {
        const comp = this.model.get('components');
        this.model.get('attributes').style = "padding:10px";
        if (!comp.length) {
          comp.reset();
          comp.add(`
            <div style="margin-left:70px; margin-right:70px; padding: 10px; font-size: 1rem">Link to channel, single video ,or video and collection from twitch in settings panel</div>
          `);
        }
      }
    }),
  });
};