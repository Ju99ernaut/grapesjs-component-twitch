import loadComponents from './components';
import loadBlocks from './blocks';

export default (editor, opts = {}) => {
  const options = {
    ...{
      // default options
      script: 'https://embed.twitch.tv/embed/v1.js',
      // Object to extend the default block, eg. `{ label: 'Twitch', ... }`
      // Pass a falsy value to avoid adding the block
      block: {},

      // Label for twitch block
      label: 'Twitch',

      // Category for twitch block
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
};