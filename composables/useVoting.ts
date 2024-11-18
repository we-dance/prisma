export default function useVoting(videos: Ref, votes: Ref) {
  const voteCount = ref(0);
  const resolved = ref(new Map());

  const updateResolvedGraph = () => {
    resolved.value = new Map(videos.value.map((v) => [v.id, new Set()]));
    votes.value.forEach(({ winnerId, loserId }) => {
      resolved.value.get(winnerId)?.add(loserId);
    });

    const propagate = (winner: string) => {
      const losers = resolved.value.get(winner);
      if (!losers) return;

      losers.forEach((loser: string) => {
        const winnerSet = resolved.value.get(winner);
        const loserSet = resolved.value.get(loser);
        if (winnerSet && loserSet) {
          loserSet.forEach((l: string) => winnerSet.add(l));
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

  const uniqueVideos = computed(() => {
    const uniqueIds = new Set();
    votes.value.forEach(({ winnerId, loserId }) => {
      uniqueIds.add(winnerId);
      uniqueIds.add(loserId);
    });
    return [...uniqueIds];
  });

  const generateNextPair = () => {
    const unresolvedPairs: [string, string][] = [];

    const votedPairs = new Set(
      votes.value.map(({ winnerId, loserId }) => `${winnerId}-${loserId}`)
    );

    videos.value.forEach((v1) => {
      videos.value.forEach((v2) => {
        if (
          v1.id !== v2.id &&
          !resolved.value.get(v1.id)?.has(v2.id) &&
          !resolved.value.get(v2.id)?.has(v1.id) &&
          !votedPairs.has(`${v1.id}-${v2.id}`) &&
          !votedPairs.has(`${v2.id}-${v1.id}`)
        ) {
          unresolvedPairs.push([v1.id, v2.id]);
        }
      });
    });

    const lastShownVideos =
      votes.value.length >= 1
        ? votes.value.slice(-1).flatMap((vote) => [vote.winnerId, vote.loserId])
        : [];

    if (unresolvedPairs.length > 0) {
      const sortedUnresolvedPairs = unresolvedPairs.sort(
        ([a1, a2], [b1, b2]) => {
          const a1Watched = uniqueVideos.value.includes(a1);
          const a2Watched = uniqueVideos.value.includes(a2);
          const b1Watched = uniqueVideos.value.includes(b1);
          const b2Watched = uniqueVideos.value.includes(b2);

          const aUnwatched = (a1Watched ? 0 : 1) + (a2Watched ? 0 : 1);
          const bUnwatched = (b1Watched ? 0 : 1) + (b2Watched ? 0 : 1);

          return bUnwatched - aUnwatched;
        }
      );

      const nextPair = sortedUnresolvedPairs[0];
      return nextPair.map((id) => videos.value.find((v: any) => v.id === id));
    }
    return null;
  };

  const currentPair = ref(generateNextPair());

  const vote = async (winner: string) => {
    if (!currentPair.value) return;

    const [left, right] = currentPair.value.map((v) => v.id);
    const loser = left === winner ? right : left;

    votes.value.push({ winnerId: winner, loserId: loser });

    voteCount.value++;
    updateResolvedGraph();
    currentPair.value = generateNextPair();
  };

  onMounted(() => {
    updateResolvedGraph();
  });

  return {
    currentPair,
    rankedVideos,
    vote,
    voteCount,
    uniqueVideos,
  };
}
