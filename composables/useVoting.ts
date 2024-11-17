export default function useVoting(videos: Ref<Video[]>, votes: Ref<Vote[]>) {
  const resolved = ref(new Map());

  const updateResolvedGraph = () => {
    resolved.value = new Map(videos.value.map((v) => [v.id, new Set()]));
    votes.value.forEach(({ winner, loser }) => {
      resolved.value.get(winner)?.add(loser);
    });

    const propagate = (winner) => {
      const losers = resolved.value.get(winner);
      if (!losers) return;

      losers.forEach((loser) => {
        const winnerSet = resolved.value.get(winner);
        const loserSet = resolved.value.get(loser);
        if (winnerSet && loserSet) {
          loserSet.forEach((l) => winnerSet.add(l));
        }
      });
    };

    videos.value.forEach((v) => propagate(v.id));
  };

  const rankedVideos = computed(() => {
    const scores = new Map(videos.value.map((v) => [v.id, 0]));

    resolved.value.forEach((losers, winner) => {
      scores.set(winner, losers.size);
    });

    return [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => id)
      .map((id) => videos.value.find((v) => v.id === id));
  });

  const generateNextPair = () => {
    const unresolvedPairs = [];

    videos.value.forEach((v1) => {
      videos.value.forEach((v2) => {
        if (
          v1.id !== v2.id &&
          !resolved.value.get(v1.id)?.has(v2.id) &&
          !resolved.value.get(v2.id)?.has(v1.id)
        ) {
          unresolvedPairs.push([v1.id, v2.id]);
        }
      });
    });

    const lastVote = votes.value[votes.value.length - 1] || {};
    const lastShownVideos = [lastVote.winner, lastVote.loser];

    const filteredPairs = unresolvedPairs.filter(
      (pair) =>
        !lastShownVideos.includes(pair[0]) && !lastShownVideos.includes(pair[1])
    );

    if (filteredPairs.length > 0) {
      const nextPair = filteredPairs[0];
      return nextPair.map((id) => videos.value.find((v) => v.id === id));
    }
    return null;
  };

  const currentPair = ref(generateNextPair());

  const vote = (winner) => {
    const [left, right] = currentPair.value.map((v) => v.id);
    const loser = left === winner ? right : left;

    votes.value.push({ winner, loser });
    updateResolvedGraph();
    currentPair.value = generateNextPair();
  };

  return {
    currentPair,
    rankedVideos,
    vote,
  };
}
