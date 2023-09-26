function associateBirdIdsToRegions(regionSeedData, birdData) {
  const cache = {};

  return regionSeedData.map((region) => {
    const newBirds = region.birds.map((birdCode) => {
      if (cache[birdCode]) {
        return cache[birdCode];
      }
      const birdId = birdData.find(
        (bird) => bird.speciesCode === birdCode
      )?._id;
      cache[birdCode] = birdId;

      return birdId;
    });

    return { ...region, birds: newBirds };
  });
}

module.exports = {
  associateBirdIdsToRegions,
};
