const campaigns = {
  main_warhammer: {
    image: {
      width: 4096,
      height: 3352,
      map: require('./wh_main_map.webp').default
    },
    game: {
      width: 1016,
      height: 720,
    }
  },
  wh2_main_great_vortex: {
    image: {
      width: 3376,
      height: 3868,
      map: require('./wh2_main_great_vortex_map.webp').default
    },
    game: {
      width: 726,
      height: 720,
    }
  }
};

export default campaigns as Record<string, any>;
