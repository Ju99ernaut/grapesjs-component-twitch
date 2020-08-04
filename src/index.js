import loadComponents from './components';
import loadBlocks from './blocks';
import en from './locale/en';

export default (editor, opts = {}) => {
  const options = {
    ...{
      i18n: {},
      // default options
      script: 'https://embed.twitch.tv/embed/v1.js',
      // Object to extend the default block, eg. `{ label: 'Typed', ... }`
      // Pass a falsy value to avoid adding the block
      block: {},

      // Label of the twitch block
      label: 'Twitch',

      // Category twitct
      category: 'Basic',

      // Customize the component props. The final object should be returned
      // from the function.
      /**
        eg. Here an example of how you would customize component's traits
        `props => {
            props.traits = props.traits.map(trait => {
              if (trait.name == 'strings') {
                trait.label = 'Custom <b>trait<b/> label';
              }
              // this trait will be removed
              if (trait.name == 'theme') return;
              return trait;
            }).filter(i => i);
            return props;
        }`
       */
      props: i => i,
    },
    ...opts
  };

  // Add components
  loadComponents(editor, options);
  // Add blocks
  loadBlocks(editor, options);
  // Load i18n files
  editor.I18n && editor.I18n.addMessages({
    en,
    ...options.i18n,
  });
};